'use client'

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

// Learning Hub waitlist — front-end-only demo, mirrors the original script.js
// behavior (no backend): on submit, lock the fields and confirm.
export default function WaitlistForm() {
  const t = useTranslations('waitlistForm')
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
        <label htmlFor="wl-name">{t('fullName')}</label>
        <input
          id="wl-name"
          name="name"
          type="text"
          placeholder={t('namePlaceholder')}
          required
          disabled={submitted}
        />
      </div>
      <div className="form__row">
        <label htmlFor="wl-email">{t('email')}</label>
        <input
          id="wl-email"
          name="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          required
          disabled={submitted}
        />
      </div>
      <div className="form__row">
        <label htmlFor="wl-interest">{t('interest')}</label>
        <select id="wl-interest" name="interest" disabled={submitted}>
          <option>{t('opt1')}</option>
          <option>{t('opt2')}</option>
          <option>{t('opt3')}</option>
          <option>{t('opt4')}</option>
          <option>{t('opt5')}</option>
          <option>{t('opt6')}</option>
        </select>
      </div>
      <button type="submit" className="btn btn--solid" disabled={submitted}>
        {submitted ? (
          t('joined')
        ) : (
          <>
            {t('join')} <span className="btn__arrow">→</span>
          </>
        )}
      </button>
      <p className="form__note">{t('note')}</p>
    </form>
  )
}
