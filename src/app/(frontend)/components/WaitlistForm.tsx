'use client'

import React, { useState } from 'react'

// Learning Hub waitlist — front-end-only demo, mirrors the original script.js
// behavior (no backend): on submit, lock the fields and confirm.
export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      className="form"
      id="waitlistForm"
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
    >
      <div className="form__row">
        <label htmlFor="wl-name">Full name</label>
        <input
          id="wl-name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          disabled={submitted}
        />
      </div>
      <div className="form__row">
        <label htmlFor="wl-email">Email</label>
        <input
          id="wl-email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          disabled={submitted}
        />
      </div>
      <div className="form__row">
        <label htmlFor="wl-interest">Most interested in</label>
        <select id="wl-interest" name="interest" disabled={submitted}>
          <option>AI &amp; Automation</option>
          <option>Build Websites &amp; Apps with AI</option>
          <option>Paid Ads</option>
          <option>SEO</option>
          <option>Marketing Strategy</option>
          <option>Business &amp; Startup Playbooks</option>
        </select>
      </div>
      <button type="submit" className="btn btn--solid" disabled={submitted}>
        {submitted ? (
          "You're on the list ✓"
        ) : (
          <>
            Join the Waitlist <span className="btn__arrow">→</span>
          </>
        )}
      </button>
      <p className="form__note">No spam. One email when your track opens.</p>
    </form>
  )
}
