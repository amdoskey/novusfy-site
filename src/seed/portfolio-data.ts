/**
 * Transcribed from assets/content/portfolio-seed-data.md (5 of ~10 case studies).
 * English only — German locale falls back until translated.
 */

/** Must stay in sync with Portfolio.servicesProvided options. */
export type ServiceValue =
  | 'branding'
  | 'web-development'
  | 'ai-automation'
  | 'digital-strategy'
  | 'marketing'
  | 'software-development'

export type SeedEntry = {
  title: string
  slug: string
  clientName: string
  industry: string
  summary: string
  content: string
  servicesProvided: ServiceValue[]
  featured: boolean
  externalLink?: string
  results?: { label: string; value: string }[]
}

export const portfolioEntries: SeedEntry[] = [
  {
    title: 'Erbil Hills',
    slug: 'erbil-hills',
    clientName: 'Erbil Hills',
    industry: 'Real Estate & Residential Development',
    servicesProvided: ['branding', 'marketing', 'digital-strategy'],
    featured: true,
    summary:
      'A full-funnel brand and marketing partnership that positioned Erbil Hills as a premium residential destination — turning property features into lifestyle value and converting interest into qualified buyer demand.',
    content: `**Challenge**

Erbil Hills needed to:
- Position itself as a premium residential destination in a competitive real estate market
- Increase brand awareness and credibility among buyers and investors
- Generate qualified leads and drive inquiries
- Clearly communicate the lifestyle value, not just property features

**Our Role & Strategy**

As the marketing agency, we acted as a strategic partner, not just a service provider.

*Brand Positioning & Messaging*
- Defined a clear brand narrative focused on lifestyle, community, and long-term value
- Refined messaging to appeal to end-users and investors
- Ensured consistent tone and visual direction across all channels

*Marketing Strategy Development*
- Designed a full-funnel marketing strategy (awareness → consideration → conversion)
- Identified core target segments: families, professionals, and investors
- Planned phased campaigns aligned with project milestones

*Digital Presence & Content*
- Developed high-impact marketing content (visuals, copy, layouts)
- Created campaign content showcasing master plan & location advantages, lifestyle imagery, and trust/quality/future value
- Optimized content for social platforms and digital ads

*Performance Marketing & Lead Generation*
- Planned and managed digital advertising campaigns
- Optimized targeting, creatives, and messaging to attract high-intent leads
- Focused on cost-efficient lead generation rather than vanity metrics

*Customer Journey Optimization*
- Structured communication flow from first contact to inquiry
- Improved clarity and simplicity in how the project is explained to prospects
- Supported sales efforts by aligning marketing messaging with on-ground sales conversations

**Results & Achievements**
- Strong brand visibility in Erbil's real estate market
- Increased qualified inquiries and buyer interest
- Clear differentiation of Erbil Hills as a premium lifestyle development
- A cohesive and professional marketing system that supported sales growth

**Key Impact**
> We didn't just market properties — we built a brand experience that helped Erbil Hills stand out, gain trust, and convert interest into real demand.`,
  },

  {
    title: 'GAV TV — Digital Transformation for News Media',
    slug: 'gav-tv',
    clientName: 'GAV TV',
    industry: 'Media & Broadcasting',
    servicesProvided: ['web-development', 'digital-strategy'],
    featured: true,
    summary:
      'A ground-up platform rebuild on Drupal Thunder that cut page load times by 87%, tripled organic traffic, and gave a non-technical editorial team the speed to compete on breaking news.',
    results: [
      { label: 'Page load time reduction', value: '87% (8.2s → 1.1s)' },
      { label: 'Uptime during traffic spikes', value: '99.8%' },
      { label: 'Concurrent user capacity', value: '5x increase' },
      { label: 'Mobile PageSpeed score', value: '32 → 94' },
      { label: 'Organic search traffic (6 months)', value: '+340%' },
      { label: 'Bounce rate', value: '68% → 37% (−45%)' },
    ],
    content: `**The Challenge**

GAV TV, a leading news platform in the Kurdistan Region, faced critical digital infrastructure challenges limiting their reach and impact. They needed a website capable of handling high concurrent traffic during breaking news, fast content publishing, empowering non-technical editorial teams, strong SEO, fast page loads, and infrastructure that could scale. Their existing site was slow, hard to manage, poorly optimized, and couldn't handle traffic spikes — directly impacting their ability to compete with other regional news platforms.

**Our Approach**

We conducted a comprehensive digital audit and built a tailored solution on data-driven insights.

*Strategic Platform Selection*

After evaluating multiple CMS options, we selected Drupal Thunder — a distribution built specifically for professional publishing, balancing performance, scalability, and editorial flexibility.

*Custom Website Development*
- Architected a lightweight, modular site structure optimized for speed
- Implemented responsive design across desktop, tablet, and mobile
- Integrated multimedia support for video, photo galleries, and live streaming
- Built custom content types for articles, breaking news, opinion pieces, and multimedia stories
- Developed automated publishing workflows with editorial approval chains

*Performance Optimization*
- Implemented advanced caching (Redis, Varnish) for fast page loads
- Optimized database queries and content delivery
- Configured a CDN for global content distribution
- Compressed/optimized all images and media assets
- Minimized CSS/JS and implemented lazy loading

*Comprehensive SEO Strategy*
- Conducted keyword research specific to Iraqi and Kurdish news topics
- Implemented structured data markup (Schema.org)
- Optimized meta titles, descriptions, and URL structures
- Created XML sitemaps and optimized robots.txt
- Implemented AMP for mobile search performance
- Built internal linking architecture to boost page authority

*User-Friendly Admin Interface*
- Designed an intuitive editorial dashboard for non-technical staff
- Implemented drag-and-drop content builders
- Created role-based permissions for reporters, editors, and administrators
- Provided training, documentation, automated backups, and version control

*Analytics & Monitoring*
- Integrated Google Analytics 4 with custom event tracking
- Real-time performance monitoring with automated alerts
- Custom dashboards for editorial performance metrics

**Editorial Efficiency**
- Content publishing time reduced 75% (20 min → 5 min per article)
- Editorial team now publishes 3x more content with the same staff
- Zero technical support tickets related to content management after training

**Business Impact**
- Strengthened market position as a leading digital news source
- Increased advertising revenue potential through higher traffic and engagement
- Enhanced brand reputation through improved UX and search presence
- Future-proof infrastructure ready to scale with organizational growth

**Conclusion**

This project demonstrates our expertise in crafting efficient, scalable digital solutions for media platforms operating in competitive, fast-paced environments. By combining Drupal Thunder's specialized capabilities with comprehensive SEO and performance optimization, we delivered a solution that met GAV TV's immediate needs and positioned them for sustainable digital growth.

**Testimonial**
> "Novusfy didn't just build us a website—they transformed our entire digital operation. The new platform is incredibly fast, our editorial team loves how easy it is to publish content, and we're seeing record traffic numbers. The SEO improvements alone have been worth the investment. This is exactly the partner we needed."
> — Obeid Rashavei, Editor-in-Chief (at the time), GAV TV`,
  },

  {
    title: 'Korek Telecom',
    slug: 'korek-telecom',
    clientName: 'Korek Telecom',
    industry: 'Telecommunications',
    servicesProvided: ['digital-strategy', 'software-development'],
    featured: false,
    summary:
      "Acting as strategic digital partner, we led Korek's omnichannel roadmap, vendor selection, and implementation oversight — turning a complex global technology decision into a governed, executive-approved rollout.",
    content: `**Challenge**

Korek needed to modernize and unify its digital platforms (website, mobile app, digital touchpoints), establish a clear omnichannel strategy aligned with business goals, select the right global technology partners for long-term scalability, and ensure executive-level visibility, control, and risk reduction during implementation.

**Our Role**

We acted as a strategic digital partner, operating at both management and execution oversight levels, bridging business objectives with technology delivery.

**What We Did**

*Digital Platform Management*
- Took ownership of end-to-end digital platform management
- Aligned digital initiatives with Korek's commercial, customer service, and brand objectives
- Defined governance structure, roles, and responsibilities

*Omnichannel Strategy & Planning*
- Established a new omnichannel vision and roadmap
- Designed how website, mobile app, CRM, customer support, and marketing channels work together
- Defined customer journeys across all touchpoints for consistency and efficiency

*Website & Mobile App Documentation*
- Led creation of full documentation packages for the new website and mobile application: functional requirements, user journeys & flows, content structure, technical expectations, UX/UI guidelines
- Ensured documents were vendor-ready and implementation-proof

*Global Service Provider Research & Shortlisting*
- Conducted worldwide research to identify top-tier digital and technology service providers
- Assessed vendors on technical capabilities, telecom experience, scalability, security & compliance, cost-to-value ratio

*Vendor Interviews & Evaluation*
- Interviewed shortlisted providers individually
- Evaluated proposals through a structured scoring framework (scope & methodology, timeline & delivery model, team structure, commercial terms)
- Eliminated risk through due diligence and clear benchmarking

*Executive Reporting & Decision Support*
- Prepared clear, structured reports for top management: strengths & weaknesses of each vendor, comparative scoring, strategic recommendations
- Enabled leadership to make confident, data-backed decisions

*Implementation Management & Supervision*
- Managed and supervised the entire implementation phase
- Acted as the central coordination point between Korek internal teams and selected service providers
- Ensured scope adherence, quality control, timeline discipline, and alignment with original strategy

**Results & Achievements**
- A clear omnichannel digital roadmap approved at executive level
- Successful selection of a best-fit global service provider
- Reduced delivery risk through strong governance and documentation
- Smooth execution supported by continuous oversight and quality assurance
- Elevated Korek's digital platforms toward scalable, customer-centric ecosystems

**Key Impact**
> We transformed complexity into clarity — enabling Korek to confidently modernize its digital ecosystem through strategy, structure, and strong execution governance.`,
  },

  {
    title: 'DDTAJ — Building an Agency From the Ground Up',
    slug: 'ddtaj',
    clientName: 'DDTAJ',
    industry:
      'Marketing & Digital Consultancy (currently active as Influencer Marketing & Conference/Event Organizing)',
    servicesProvided: ['branding', 'web-development', 'software-development', 'digital-strategy'],
    featured: true,
    externalLink: 'https://ddtaj.com',
    summary:
      'Not a client project — a company built from zero. Novusfy founded, branded, staffed, and systemized DDTAJ into a fully functioning agency, now active in influencer marketing and event organization.',
    content: `**Challenge**

Rather than delivering a project for an existing business, this engagement started with nothing: no company, no brand, no team, no systems. The goal was to build a fully operational marketing and digital transformation agency from the ground up, capable of taking on real clients and delivering real work independently.

**Our Role**

For the first six months, Novusfy operated as a startup and business development consultancy for what would become DDTAJ — taking it from concept to a ready-to-deliver agency.

**What We Did**

*Company Formation & Business Development*
- Provided startup and business development consultancy for the first 6 months, structuring the business until it was ready to independently deliver client work

*Brand Identity*
- Developed the DDTAJ name, logo, and full corporate identity (color system, typography, brand guidelines)
- Positioned DDTAJ around a clear value proposition: data-driven marketing excellence and digital transformation

*Team Building*
- Recruited and hired DDTAJ's founding team, including four major agency-role hires forming the core specialist team

*Core Systems*
- Built DDTAJ's website
- Implemented an ERP system for internal operations
- Set up a communication system for team and client-facing workflows

*Service Line Design*
- Structured DDTAJ's full service offering: Research & Strategy, Creative & Branding, Digital Marketing, Social Media Management, Web Development, AI Automation, Events & Activations, and Influencer Agency

**Results & Achievements**
- DDTAJ launched as a fully independent, functioning agency with its own team, systems, and client base
- Now active primarily in influencer marketing and conference/event organization
- Operates under its own brand at ddtaj.com, based in Duhok

**Key Impact**
> We didn't just consult on a marketing plan — we built the company itself: the brand, the team, and the systems that let it operate on its own.`,
  },

  {
    title: 'Aral Hope Medical Complex (incl. Lunava Pharmacy)',
    slug: 'aral-hope-medical-complex',
    clientName: 'Aral Hope Medical Complex',
    industry: 'Healthcare, Medical Services, Pharmacy',
    servicesProvided: ['branding', 'marketing'],
    featured: false,
    summary:
      'A full brand launch and ongoing digital activation that introduced Aral Hope Medical Complex and Lunava Pharmacy to the Duhok market — building trust and recognition from day one.',
    content: `**Challenge**

Aral Hope Medical Complex was launching as a new healthcare destination and needed to introduce the brand clearly and professionally to the Duhok market, build trust and credibility from day one, ensure strong visibility and awareness across digital channels, and maintain consistent, high-quality communication for both the medical complex and Lunava Pharmacy.

**Our Role**

We acted as the brand and digital marketing partner, leading the launch, activation, and ongoing brand communication efforts.

**What We Did**

*Brand Launch & Branding*
- Led the full brand launch of Aral Hope Medical Complex
- Developed brand messaging emphasizing professionalism, care and trust, accessibility and modern healthcare
- Ensured alignment between the medical complex and Lunava Pharmacy under one cohesive brand ecosystem

*Digital Activation & Market Awareness*
- Executed a digital activation strategy to introduce the complex to the Duhok audience
- Launched targeted awareness campaigns and published consistent, informative, trust-building content
- Positioned Aral Hope as a recognized medical destination in Duhok, not just a new opening

*Local Market Penetration (Duhok Awareness)*
- Designed campaigns focused on location awareness, services and specialties, and community-focused messaging
- Built familiarity and recall within a short launch period

*Social Media Management*
- Took full responsibility for social media management: content calendars, visual direction, copywriting and messaging
- Balanced medical professionalism with approachable, human communication

*Day-to-Day Brand Communication & Marketing*
- Managed daily brand communication across digital channels
- Ensured consistent brand voice, timely responses and updates, alignment with medical ethics and standards
- Supported ongoing marketing initiatives and service promotions

**Results & Achievements**
- Successful brand launch with strong initial awareness
- Rapid recognition of Aral Hope Medical Complex within Duhok
- Clear and consistent brand presence for both the medical complex and Lunava Pharmacy
- Sustained engagement through structured social media and daily communication
- A trusted, professional healthcare brand established from the ground up

**Key Impact**
> We didn't just launch a medical complex — we built awareness, trust, and ongoing communication that positioned Aral Hope as a reliable healthcare destination in Duhok.`,
  },
]
