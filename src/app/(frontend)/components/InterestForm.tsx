'use client'

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { LEARNING_FORMATS, LEARNING_TOPICS } from '@/config/learning'
import PrivacyAck, { FormError } from './PrivacyAck'

type Status = 'idle' | 'sending' | 'ok' | 'error'

/**
 * Learning interest form. Sent through /contact/send as type
 * "learning-interest" — emailed only, nothing is stored.
 */
export default function InterestForm() {
  const t = useTranslations('interestForm')
  const tl = useTranslations('learning')
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setStatus('sending')

    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch('/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'learning-interest' }),
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
        <label htmlFor="i-company">Company</label>
        <input id="i-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__row">
        <label htmlFor="i-name">{t('name')}</label>
        <input id="i-name" name="name" type="text" placeholder={t('namePlaceholder')} required />
      </div>
      <div className="form__row">
        <label htmlFor="i-email">{t('email')}</label>
        <input
          id="i-email"
          name="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          required
        />
      </div>
      <div className="form__row">
        <label htmlFor="i-topic">{t('topic')}</label>
        <select id="i-topic" name="topic" required defaultValue="">
          <option value="" disabled>
            {t('topicPlaceholder')}
          </option>
          {LEARNING_TOPICS.map((o) => (
            <option key={o.key} value={o.key}>
              {o.cat ? tl(`cat${o.cat}Title`) : t('topicOther')}
            </option>
          ))}
        </select>
      </div>
      <div className="form__row">
        <label htmlFor="i-format">{t('format')}</label>
        <select id="i-format" name="format" required defaultValue="">
          <option value="" disabled>
            {t('formatPlaceholder')}
          </option>
          {LEARNING_FORMATS.map((f) => (
            <option key={f} value={f}>
              {t(`format_${f}`)}
            </option>
          ))}
        </select>
      </div>
      <div className="form__row">
        <label htmlFor="i-message">{t('message')}</label>
        <textarea id="i-message" name="message" placeholder={t('messagePlaceholder')} />
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
