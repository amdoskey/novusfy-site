import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import { LEARNING_FORMATS, LEARNING_TOPICS } from '@/config/learning'
import en from '../../../../../messages/en.json'

export const runtime = 'nodejs'

// Where submissions are delivered, and the verified sender they come from.
const TO = 'info@novusfy.com'
const FROM = process.env.CONTACT_FROM || 'Novusfy Website <onboarding@resend.dev>'

// Lightweight in-memory rate limit (best-effort; resets on cold start).
const RATE_LIMIT_MS = 30_000
const lastByIp = new Map<string, number>()

// Allow-list for the `type` field. Anything else is rejected.
const TYPES = ['contact', 'learning-interest'] as const
type FormType = (typeof TYPES)[number]

// English labels for the email, taken from the same messages the form shows.
const TOPIC_LABEL: Record<string, string> = Object.fromEntries(
  LEARNING_TOPICS.map((o) => [
    o.key,
    o.cat ? en.learning[`cat${o.cat}Title` as keyof typeof en.learning] : en.interestForm.topicOther,
  ]),
)
const FORMAT_LABEL: Record<string, string> = Object.fromEntries(
  LEARNING_FORMATS.map((f) => [f, en.interestForm[`format_${f}` as keyof typeof en.interestForm]]),
)

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

function isEmail(v: unknown): v is string {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot — real users never fill this hidden field. Pretend success.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const type = (str(body.type) || 'contact') as FormType
  if (!TYPES.includes(type)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = str(body.name)
  const email = str(body.email)
  const subject = str(body.subject)
  const message = str(body.message)
  const topic = str(body.topic)
  const format = str(body.format)
  const isInterest = type === 'learning-interest'

  // The privacy checkbox is required on both forms; browsers send "on".
  if (body.privacy !== 'on') {
    return NextResponse.json({ error: 'Please acknowledge the privacy policy.' }, { status: 400 })
  }
  if (!name || !isEmail(email) || (!isInterest && !message)) {
    return NextResponse.json(
      { error: 'Please provide your name, a valid email, and a message.' },
      { status: 400 },
    )
  }
  if (isInterest && (!(topic in TOPIC_LABEL) || !(format in FORMAT_LABEL))) {
    return NextResponse.json({ error: 'Please choose a topic and a format.' }, { status: 400 })
  }
  if (message.length > 5000 || name.length > 200 || subject.length > 200) {
    return NextResponse.json({ error: 'That message is too long.' }, { status: 400 })
  }

  // Basic per-IP throttle.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const now = Date.now()
  const last = lastByIp.get(ip)
  if (last && now - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { error: 'You just sent a message — please wait a moment before sending another.' },
      { status: 429 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set — cannot send contact email.')
    return NextResponse.json(
      { error: 'Email is not configured yet. Please email info@novusfy.com directly.' },
      { status: 500 },
    )
  }

  // Field rows for the email; the interest form has topic/format instead of subject.
  const rows: [string, string][] = isInterest
    ? [
        ['Name', name],
        ['Email', email],
        ['Topic', TOPIC_LABEL[topic]],
        ['Format', FORMAT_LABEL[format]],
      ]
    : [
        ['Name', name],
        ['Email', email],
        ['Subject', subject || '(none)'],
      ]
  const body_ = message || '(no message)'

  const subjectLine = isInterest
    ? `Learning interest: ${TOPIC_LABEL[topic]}`
    : subject
      ? `New enquiry: ${subject}`
      : 'New website enquiry'
  const heading = isInterest ? 'New learning interest' : 'New contact form submission'
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${body_}`
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#151C27">
      <h2 style="margin:0 0 12px">${heading}</h2>
      ${rows.map(([k, v]) => `<p style="margin:0 0 6px"><strong>${k}:</strong> ${escapeHtml(v)}</p>`).join('\n      ')}
      <p style="margin:12px 0 0;white-space:pre-wrap">${escapeHtml(body_)}</p>
    </div>`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: subjectLine,
      text,
      html,
    })
    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Could not send your message.' }, { status: 502 })
    }
  } catch (err) {
    console.error('Resend threw:', err)
    return NextResponse.json({ error: 'Could not send your message.' }, { status: 502 })
  }

  lastByIp.set(ip, now)
  return NextResponse.json({ ok: true })
}
