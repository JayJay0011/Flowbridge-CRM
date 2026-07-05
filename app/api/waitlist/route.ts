import { NextResponse } from "next/server";
import { sendInternalWaitlistNotification, sendWaitlistConfirmation } from "@/lib/email/waitlist";
import { getSupabaseAdmin } from "@/lib/supabase/server";

type WaitlistPayload = {
  name?: unknown;
  email?: unknown;
  businessType?: unknown;
  currentSystem?: unknown;
  setupInterest?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  let payload: WaitlistPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = parseWaitlistPayload(payload);

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  if (parsed.value.website) {
    return NextResponse.json({ ok: true });
  }

  let supabase;

  try {
    supabase = getSupabaseAdmin();
  } catch {
    return NextResponse.json(
      { error: "Waitlist storage is not configured yet." },
      { status: 503 },
    );
  }

  const userAgent = request.headers.get("user-agent");
  const referrer = request.headers.get("referer");

  const { data, error } = await supabase
    .from("waitlist_submissions")
    .upsert(
      {
        name: parsed.value.name,
        email: parsed.value.email,
        business_type: parsed.value.businessType,
        current_system: parsed.value.currentSystem,
        setup_interest: parsed.value.setupInterest,
        source: "landing_page",
        user_agent: userAgent,
        referrer,
        status: "requested",
      },
      { onConflict: "email_normalized" },
    )
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Could not save waitlist request." },
      { status: 500 },
    );
  }

  const emailInput = {
    name: parsed.value.name,
    email: parsed.value.email,
    businessType: parsed.value.businessType,
    currentSystem: parsed.value.currentSystem,
    setupInterest: parsed.value.setupInterest,
  };

  const [confirmationEmail, internalNotification] = await Promise.all([
    sendWaitlistConfirmation(emailInput),
    parsed.value.setupInterest.toLowerCase().includes("flowbridge")
      ? sendInternalWaitlistNotification(emailInput)
      : Promise.resolve({ skipped: true }),
  ]);

  return NextResponse.json({
    ok: true,
    id: data?.id,
    confirmationEmail,
    internalNotification,
  });
}

function parseWaitlistPayload(payload: WaitlistPayload):
  | {
      ok: true;
      value: {
        name: string;
        email: string;
        businessType: string;
        currentSystem: string;
        setupInterest: string;
        website: string;
      };
    }
  | { ok: false; error: string } {
  const name = normalize(payload.name);
  const email = normalize(payload.email).toLowerCase();
  const businessType = normalize(payload.businessType);
  const currentSystem = normalize(payload.currentSystem);
  const setupInterest = normalize(payload.setupInterest);
  const website = normalize(payload.website);

  if (!name || name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!businessType || businessType.length < 2) {
    return { ok: false, error: "Please enter your business type." };
  }

  if (!currentSystem) {
    return { ok: false, error: "Please select your current CRM or system." };
  }

  if (!setupInterest) {
    return { ok: false, error: "Please select your setup interest." };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      businessType,
      currentSystem,
      setupInterest,
      website,
    },
  };
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 500) : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
