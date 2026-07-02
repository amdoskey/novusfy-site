import React from 'react'

// Shared social row — used in the Footer and on the Contact page.
// Icons use currentColor so they inherit the muted/hover colors from CSS.
const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/novusfy/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="4.2" fill="none" strokeWidth="1.7" />
        <circle cx="17.4" cy="6.6" r="1.2" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/novusfy/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          stroke="none"
          d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.46-.13-2.44 0-4.11 1.49-4.11 4.22V9.9H7.4V13h2.73v8z"
        />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/novusfy',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          stroke="none"
          d="M4.98 3.5A2.49 2.49 0 1 1 0 3.5a2.49 2.49 0 0 1 4.98 0zM.25 8.25h4.46V22H.25zM8.05 8.25h4.27v1.88h.06c.6-1.13 2.05-2.32 4.22-2.32 4.51 0 5.35 2.97 5.35 6.83V22h-4.46v-6.47c0-1.54-.03-3.53-2.15-3.53-2.16 0-2.49 1.68-2.49 3.42V22H8.05z"
        />
      </svg>
    ),
  },
]

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className ? `social ${className}` : 'social'}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}
