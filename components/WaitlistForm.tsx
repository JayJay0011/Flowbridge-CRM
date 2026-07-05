"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (submitted) {
    return (
      <div className="waitlist-confirmation" role="status">
        <strong>You are on the early access list.</strong>
        <p>
          We will send product updates, launch notes, and setup availability as
          FlowBridge CRM moves closer to private beta.
        </p>
      </div>
    );
  }

  return (
    <form
      className="waitlist-form"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
          const response = await fetch("/api/waitlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.get("name"),
              email: formData.get("email"),
              businessType: formData.get("businessType"),
              currentSystem: formData.get("currentSystem"),
              setupInterest: formData.get("setupInterest"),
              website: formData.get("website"),
            }),
          });

          const result = (await response.json()) as { error?: string };

          if (!response.ok) {
            setError(result.error || "Could not submit your request.");
            return;
          }

          setSubmitted(true);
          form.reset();
        } catch {
          setError("Could not submit your request. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <input aria-label="Name" name="name" placeholder="Name" required />
      <input aria-label="Email" name="email" placeholder="Email" required type="email" />
      <input
        aria-label="Business type"
        name="businessType"
        placeholder="What kind of business do you run?"
        required
      />
      <select aria-label="Current CRM or system" defaultValue="" name="currentSystem" required>
        <option value="" disabled>
          Current CRM or system
        </option>
        <option>None yet</option>
        <option>Spreadsheet</option>
        <option>HubSpot</option>
        <option>Pipedrive</option>
        <option>GoHighLevel</option>
        <option>Other CRM</option>
      </select>
      <select aria-label="Setup interest" defaultValue="" name="setupInterest" required>
        <option value="" disabled>
          Setup interest
        </option>
        <option>I want to set it up myself</option>
        <option>I may want FlowBridge setup help</option>
        <option>I am not sure yet</option>
      </select>
      <input
        aria-hidden="true"
        autoComplete="off"
        hidden
        name="website"
        tabIndex={-1}
        type="text"
      />
      {error ? <p className="form-error">{error}</p> : null}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Requesting access..." : "Request access"}
      </button>
    </form>
  );
}
