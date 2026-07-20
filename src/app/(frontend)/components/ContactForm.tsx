'use client'

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function ContactForm() {
  const t = useTranslations('contactForm')
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
      const res = await fetch('/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || t('genericError'))
      }
      setStatus('ok')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : t('genericError'))
    }
  }

  if (status === 'ok') {
    return (
      <div className="form">
        <p className="form__status form__status--ok" role="status">
          {t('success')}
        </p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {/* Honeypot — bots fill this; humans never see it. Deliberately untranslated. */}
      <div className="form__hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__row">
        <label htmlFor="c-name">{t('name')}</label>
        <input id="c-name" name="name" type="text" placeholder={t('namePlaceholder')} required />
      </div>
      <div className="form__row">
        <label htmlFor="c-email">{t('email')}</label>
        <input
          id="c-email"
          name="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          required
        />
      </div>
      <div className="form__row">
        <label htmlFor="c-subject">{t('subject')}</label>
        <input id="c-subject" name="subject" type="text" placeholder={t('subjectPlaceholder')} />
      </div>
      <div className="form__row">
        <label htmlFor="c-message">{t('message')}</label>
        <textarea id="c-message" name="message" placeholder={t('messagePlaceholder')} required />
      </div>

      <button type="submit" className="btn btn--solid" disabled={status === 'sending'}>
        {status === 'sending' ? (
          t('sending')
        ) : (
          <>
            {t('send')} <span className="btn__arrow">→</span>
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="form__status form__status--err" role="alert">
          {error || t('fallbackError')}
        </p>
      )}
    </form>
  )
}
