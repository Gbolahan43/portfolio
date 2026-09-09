/**
 * Site-level configuration — all site-wide metadata and external URLs.
 * Single source of truth for SEO, social, and navigation metadata.
 */

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────
  name: 'Abdulbasit Olanrewaju',
  role: 'AI / ML Engineer',
  title: 'Abdulbasit Olanrewaju — AI/ML Engineer',
  description:
    'AI/ML Engineer building agentic AI and RAG systems that turn messy domain data into reliable, cost-optimized tools on AWS.',
  tagline: 'I build agentic AI and RAG systems that turn messy domain data into reliable, cost-optimized tools.',
  subline: 'Serverless cloud architectures and production LLM orchestration on AWS.',

  // ── Domain / URLs ─────────────────────────────────────────
  domain: 'https://abdulbasitolanrewaju.com',

  // ── Social / External ─────────────────────────────────────
  github: 'https://github.com/Gbolahan43',
  linkedin: 'https://www.linkedin.com/in/abdulbasit-olanrewaju-gbolahan',

  // ── Assets ────────────────────────────────────────────────
  resumePdf: 'abdulbasit-olanrewaju-resume.pdf',
  portrait: '/portfolio/images/portrait.png',

  // ── Theme ─────────────────────────────────────────────────
  defaultTheme: 'light' as const,
} as const;
