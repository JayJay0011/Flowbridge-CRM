import { NextResponse } from "next/server";
import { occupationTemplateIds, setupModeTitles } from "@/data/template-config";
import { getSupabaseAdmin } from "@/lib/supabase/server";

type OnboardingPayload = {
  workspaceName?: unknown;
  occupationTemplateId?: unknown;
  setupMode?: unknown;
};

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!token) {
    return NextResponse.json({ error: "You must be signed in to create a workspace." }, { status: 401 });
  }

  let payload: OnboardingPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = parseOnboardingPayload(payload);

  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  let supabase;

  try {
    supabase = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ error: "Supabase workspace storage is not configured yet." }, { status: 503 });
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Your session could not be verified." }, { status: 401 });
  }

  const userId = userData.user.id;

  const { data: workspace, error: workspaceError } = await supabase
    .from("workspaces")
    .insert({
      name: parsed.value.workspaceName,
      owner_user_id: userId,
      occupation_template_id: parsed.value.occupationTemplateId,
      setup_mode: parsed.value.setupMode,
      status: "onboarding",
    })
    .select("id, name")
    .single();

  if (workspaceError || !workspace) {
    return NextResponse.json({ error: "Could not create workspace." }, { status: 500 });
  }

  const { error: memberError } = await supabase.from("workspace_members").insert({
    workspace_id: workspace.id,
    user_id: userId,
    role: "owner",
  });

  if (memberError) {
    return NextResponse.json({ error: "Workspace was created, but owner membership failed." }, { status: 500 });
  }

  let setupRequestId: string | null = null;

  if (parsed.value.setupMode.toLowerCase().includes("flowbridge")) {
    const { data: setupRequest, error: setupRequestError } = await supabase
      .from("setup_requests")
      .insert({
        workspace_id: workspace.id,
        requester_user_id: userId,
        occupation_template_id: parsed.value.occupationTemplateId,
        setup_mode: parsed.value.setupMode,
        status: "requested",
      })
      .select("id")
      .single();

    if (setupRequestError) {
      return NextResponse.json({ error: "Workspace was created, but setup request failed." }, { status: 500 });
    }

    setupRequestId = setupRequest?.id ?? null;
  }

  return NextResponse.json({
    ok: true,
    workspaceId: workspace.id,
    workspaceName: workspace.name,
    setupRequestId,
  });
}

function parseOnboardingPayload(payload: OnboardingPayload):
  | {
      ok: true;
      value: {
        workspaceName: string;
        occupationTemplateId: string;
        setupMode: string;
      };
    }
  | { ok: false; error: string } {
  const workspaceName = normalize(payload.workspaceName);
  const occupationTemplateId = normalize(payload.occupationTemplateId);
  const setupMode = normalize(payload.setupMode);

  if (workspaceName.length < 2) {
    return { ok: false, error: "Workspace name must be at least 2 characters." };
  }

  if (!occupationTemplateIds.includes(occupationTemplateId as (typeof occupationTemplateIds)[number])) {
    return { ok: false, error: "Please choose a valid occupation template." };
  }

  if (!setupModeTitles.includes(setupMode as (typeof setupModeTitles)[number])) {
    return { ok: false, error: "Please choose a valid setup mode." };
  }

  return {
    ok: true,
    value: {
      workspaceName,
      occupationTemplateId,
      setupMode,
    },
  };
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 240) : "";
}
