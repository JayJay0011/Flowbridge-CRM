"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

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
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <input aria-label="Name" placeholder="Name" required />
      <input aria-label="Email" placeholder="Email" required type="email" />
      <input
        aria-label="Business type"
        placeholder="What kind of business do you run?"
        required
      />
      <select aria-label="Current CRM or system" defaultValue="">
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
      <select aria-label="Setup interest" defaultValue="">
        <option value="" disabled>
          Setup interest
        </option>
        <option>I want to set it up myself</option>
        <option>I may want FlowBridge setup help</option>
        <option>I am not sure yet</option>
      </select>
      <button type="submit">Request access</button>
    </form>
  );
}
