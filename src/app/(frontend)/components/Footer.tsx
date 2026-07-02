import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <div className="foot__brand">
          <Link className="brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand__mark" src="/icon-white.png" alt="" />
            <span className="brand__word brand__word--invert">Novusfy</span>
          </Link>
          <p className="foot__slogan">Your Next Begins Now.</p>
        </div>
        <div className="foot__col">
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/#work">Work</Link>
        </div>
        <div className="foot__col">
          <h4>Explore</h4>
          <Link href="/learning-hub">Learning Hub</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="#">Privacy</Link>
        </div>
        <div className="foot__col">
          <h4>Reach us</h4>
          <a href="mailto:info@novusfy.com">info@novusfy.com</a>
          <a href="#">Germany · Erbil</a>
          <a href="#">novusfy.com</a>
        </div>
      </div>
      <div className="wrap foot__base">
        <span>© 2026 Novusfy. All rights reserved.</span>
        <span>Clarity · Strategy · Execution · Growth</span>
      </div>
    </footer>
  )
}
