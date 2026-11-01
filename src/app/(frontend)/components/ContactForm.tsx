'use client'

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import PrivacyAck, { FormError } from './PrivacyAck'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function ContactForm() {
  const t = useTranslations('contactForm')
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    // noValidate keeps our own styling; still enforce required fields here.
    if (!form.reportValidity()) return
    setStatus('sending')

    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'contact' }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('ok')
      form.reset()
    } catch {
      setStatus('error')
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

      <PrivacyAck />

      <button type="submit" className="btn btn--solid" disabled={status === 'sending'}>
        {status === 'sending' ? (
          t('sending')
        ) : (
          <>
            {t('send')} <span className="btn__arrow">→</span>
          </>
        )}
      </button>

      {status === 'error' && <FormError />}
    </form>
  )
}
