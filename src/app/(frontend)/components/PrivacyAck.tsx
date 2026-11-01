'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

/**
 * Required privacy acknowledgement (not consent — the forms rely on
 * Art. 6(1)(f)/(b) DSGVO). Shared by the contact and learning-interest forms.
 */
export default function PrivacyAck() {
  const t = useTranslations('contactForm')
  return (
    <label className="form__consent">
      <input type="checkbox" name="privacy" required />
      {t.rich('privacy', {
        a: (chunks) => (
          <a href="/datenschutz" target="_blank" rel="noopener noreferrer">
            {chunks}
          </a>
        ),
      })}
    </label>
  )
}

/** Localized failure message with a mailto fallback. */
export function FormError() {
  const t = useTranslations('contactForm')
  return (
    <p className="form__status form__status--err" role="alert">
      {t.rich('error', {
        a: (chunks) => (
          <a href="mailto:info@novusfy.com" dir="ltr">
            {chunks}
          </a>
        ),
      })}
    </p>
  )
}
