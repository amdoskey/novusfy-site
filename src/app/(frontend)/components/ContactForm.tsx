'use client'

import React, { useState } from 'react'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setError('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong.')
      }
      setStatus('ok')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'ok') {
    return (
      <div className="form">
        <p className="form__status form__status--ok" role="status">
          Thanks — we&apos;ll be in touch shortly.
        </p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {/* Honeypot — bots fill this; humans never see it. */}
      <div className="form__hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__row">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" name="name" type="text" placeholder="Your name" required />
      </div>
      <div className="form__row">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" placeholder="you@company.com" required />
      </div>
      <div className="form__row">
        <label htmlFor="c-subject">Subject (optional)</label>
        <input id="c-subject" name="subject" type="text" placeholder="What's this about?" />
      </div>
      <div className="form__row">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" placeholder="Tell us about your next move…" required />
      </div>

      <button type="submit" className="btn btn--solid" disabled={status === 'sending'}>
        {status === 'sending' ? (
          'Sending…'
        ) : (
          <>
            Send message <span className="btn__arrow">→</span>
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="form__status form__status--err" role="alert">
          {error || "Couldn't send your message — please email info@novusfy.com directly."}
        </p>
      )}
    </form>
  )
}
