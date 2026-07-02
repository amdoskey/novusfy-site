import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

// Where submissions are delivered, and the verified sender they come from.
const TO = 'info@novusfy.com'
const FROM = process.env.CONTACT_FROM || 'Novusfy Website <onboarding@resend.dev>'

// Lightweight in-memory rate limit (best-effort; resets on cold start).
const RATE_LIMIT_MS = 30_000
const lastByIp = new Map<string, number>()

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

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || !message || !isEmail(email)) {
    return NextResponse.json(
      { error: 'Please provide your name, a valid email, and a message.' },
      { status: 400 },
    )
  }
  if (message.length > 5000 || name.length > 200) {
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

  const subjectLine = subject ? `New enquiry: ${subject}` : 'New website enquiry'
  const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '(none)'}\n\n${message}`
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#151C27">
      <h2 style="margin:0 0 12px">New contact form submission</h2>
      <p style="margin:0 0 6px"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 6px"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 12px"><strong>Subject:</strong> ${escapeHtml(subject || '(none)')}</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
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
