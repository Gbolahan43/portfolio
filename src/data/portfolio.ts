/**
 * Portfolio content — all user-facing strings from content-inventory.md.
 * Structured for type-safe access; no content lives in component markup.
 * Missing URLs use null and render as "pending" plain text (never dead links).
 */

// ── Shared tag vocabulary (controlled across all sections) ─────────
export type Tag =
  | 'retrieval'
  | 'agents'
  | 'serverless'
  | 'vision'
  | 'anomaly-detection'
  | 'prompt-engineering';

export type Format = 'essay' | 'talk';

// ── Link shape: URL | null (null = pending, renders as plain text) ──
export interface Link {
  label: string;
  href: string | null;
}

// ── Résumé CTA pair: primary opens PDF, secondary downloads ─────────
export interface ResumeCta {
  open: {
    label: string;
    href: string;
    sr: string; // screen-reader-only "(opens in a new tab)"
  };
  download: {
    href: string;
    ariaLabel: string;
  };
}

// ── Outcome slot: 3 states per design-system-spec §9.2 ─────────────
export type Outcome =
  | { state: 'A'; value: string; method: string }
  | { state: 'B'; text: string }
  | { state: 'C' };

// ── Featured project (§01) ──────────────────────────────────────────
export interface FeaturedProject {
  index: string;
  title: string;
  domain: string;
  system: string;
  outcome: Outcome;
  tags: Tag[];
  links: { repo: Link; demo: Link };
  screenshot: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  detail: {
    problem: string;
    constraint: string;
    decisions: { n: string; text: string }[];
    tradeoffs: string;
    stack: string[];
  };
}

// ── Compact project ("Also built") ─────────────────────────────────
export interface CompactProject {
  title: string;
  description: string;
  thumbnail: { src: string; alt: string };
  links: Link[];
}

// ── Open source entry ──────────────────────────────────────────────
export interface OpenSourceEntry {
  title: string;
  role: 'Contributor' | 'Maintainer';
  summary: string;
  link: Link;
}

// ── Thinking entry (essays + talks merged) ────────────────────────
export interface ThinkingEntry {
  format: Format;
  title: string;
  venue: string;
  tags: Tag[];
  link: string | null;
}

// ── Section data ────────────────────────────────────────────────────
export interface HeroData {
  eyebrow: string;
  headline: string[];
  subline: string;
  availability: string;
  resume: ResumeCta;
  getInTouchHref: string;
  evidence: string[];
}

export interface ContactData {
  heading: string;
  subline: string;
  email: string | null;
  secondaryLinks: Link[];
}

// ── Section metadata ────────────────────────────────────────────────
export interface SectionData {
  num: string;
  name: string;
  href: string;
  id: string;
}

// ═══ DATA ═══════════════════════════════════════════════════════════

export const hero: HeroData = {
  eyebrow: 'AI / ML Engineer',
  headline: [
    'I build agentic AI and RAG systems',
    'that turn messy domain data into',
    'reliable, cost-optimized tools.',
  ],
  subline: 'Serverless cloud architectures and production LLM orchestration on AWS.',
  availability: 'Lagos, Nigeria · Open to remote, hybrid, or on-site',
  resume: {
    open: {
      label: 'Résumé',
      href: 'abdulbasit-olanrewaju-resume.pdf',
      sr: '(opens in a new tab)',
    },
    download: {
      href: 'abdulbasit-olanrewaju-resume.pdf',
      ariaLabel: 'Download résumé PDF',
    },
  },
  getInTouchHref: '#contact',
  evidence: [
    'AWS Community Builder · Year 4',
    'Bedrock · RAG · Agents · Serverless',
    'Lagos, Nigeria — Remote / Hybrid / On-site',
  ],
};

// Section labels
export const sections = {
  work: { num: '§01', name: 'Selected Work', href: '#work', id: 'work' },
  openSource: { num: '§02', name: 'Open Source', href: '#open-source', id: 'open-source' },
  thinking: { num: '§03', name: 'Thinking', href: '#thinking', id: 'thinking' },
  community: { num: '§04', name: 'Community', href: '#community', id: 'community' },
  about: { num: '§05', name: 'About', href: '#about', id: 'about' },
  contact: { num: '§06', name: 'Contact', href: '#contact', id: 'contact' },
} as const;

// Navigation links (abbreviated names, per portfolio-design-plan §3.7)
export const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Thinking', href: '#thinking' },
  { name: 'About', href: '#about' },
];

// ── Featured projects (§01) ────────────────────────────────────────
export const featuredProjects: FeaturedProject[] = [
  {
    index: '01.1',
    title: 'AgriSabi',
    domain: 'Agricultural diagnostics for smallholder farmers',
    system:
      'A Retrieval-Augmented Generation pipeline on AWS Bedrock Knowledge Bases, pairing Claude vision models with a corpus of agronomic literature.',
    outcome: {
      state: 'B',
      text: 'Returns localized, source-grounded diagnostic guidance from a corpus of agronomic documents.',
    },
    tags: ['retrieval', 'vision', 'serverless'],
    links: {
      repo: { label: 'Repo', href: null },
      demo: { label: 'Demo', href: null },
    },
    screenshot: {
      src: '/images/agrisabi.png',
      alt: 'AgriSabi interface — a diagnostic response with cited agronomic sources',
      width: 1600,
      height: 900,
    },
    detail: {
      problem: 'Farmers lack immediate access to localized, science-backed diagnostic advice.',
      constraint:
        'Sub-2-second response while retrieving across thousands of agronomic documents. ⚠️ Confirm the latency target was real.',
      decisions: [
        {
          n: '01',
          text: 'Bedrock Knowledge Bases over a self-managed vector store — managed retrieval kept the serverless footprint intact and removed index operations from scope.',
        },
        {
          n: '02',
          text: 'Claude vision for image intake rather than a bespoke classifier — accepted higher per-call cost to avoid training and maintaining a model on limited labelled data.',
        },
      ],
      tradeoffs:
        'Chose a larger, slower vision model for image processing to guarantee accuracy at the expense of higher API cost per query.',
      stack: ['Bedrock', 'Claude', 'Python', 'Lambda'],
    },
  },
  {
    index: '01.2',
    title: 'ChainQuery AI',
    domain: 'Natural-language analytics over Solana on-chain data',
    system:
      'A translation layer converting natural-language prompts into optimized DuneSQL, constrained to execute inside Dune\'s query timeout.',
    outcome: {
      state: 'B',
      text: 'Non-technical stakeholders query Solana on-chain data without writing SQL.',
    },
    tags: ['agents', 'retrieval'],
    links: {
      repo: { label: 'Repo', href: null },
      demo: { label: 'Demo', href: null },
    },
    screenshot: {
      src: '/images/chainquery.png',
      alt: 'ChainQuery AI interface — a natural-language prompt and the DuneSQL it generated',
      width: 1600,
      height: 900,
    },
    detail: {
      problem: 'Blockchain analytics demands complex SQL, locking out non-technical stakeholders.',
      constraint:
        'Generated SQL had to execute within Dune\'s hard timeout — correctness alone was insufficient; queries had to be cheap.',
      decisions: [
        {
          n: '01',
          text: 'Restricted the accepted vocabulary to financial and transaction terms, trading general conversation for query reliability.',
        },
        {
          n: '02',
          text: 'Optimized for first-attempt execution rather than retry loops — a failed query costs the user their whole session.',
        },
      ],
      tradeoffs:
        'Restricting vocabulary to financial and transaction terms raised accuracy but limited general conversational capability.',
      stack: ['DuneSQL', 'Solana', 'Python'],
    },
  },
  {
    index: '01.3',
    title: 'FleetGuard',
    domain: 'Fleet telemetry monitoring for logistics operators',
    system:
      'Machine-learning anomaly detection over real-time vehicle telemetry, with Amazon Bedrock interpreting flagged events for dispatchers.',
    outcome: {
      state: 'A',
      value: 'Fifth place · One with AI hackathon',
      method: 'Externally judged placement',
    },
    tags: ['anomaly-detection', 'serverless'],
    links: {
      repo: { label: 'Repo', href: null },
      demo: { label: 'Demo', href: null },
    },
    screenshot: {
      src: '/images/fleetguard.png',
      alt: 'FleetGuard dispatcher view — flagged telemetry anomalies with Bedrock explanations',
      width: 1600,
      height: 900,
    },
    detail: {
      problem: 'Logistics operators lose revenue to undetected fuel theft and route abuse.',
      constraint:
        'Concurrent telemetry streams from hundreds of vehicles without dropping packets. ⚠️ Confirm the vehicle count.',
      decisions: [
        {
          n: '01',
          text: 'Prioritized recall over precision — a missed theft costs more than a reviewed false positive.',
        },
        {
          n: '02',
          text: 'Bedrock as the interpretation layer rather than raw anomaly scores — dispatchers act on explanations, not floats.',
        },
      ],
      tradeoffs:
        'Prioritizing recall over precision meant no theft event was missed, at the cost of more manual review for dispatchers.',
      stack: ['Bedrock', 'Python', 'AWS'],
    },
  },
];

// ── Also built (compact) ─────────────────────────────────────
export const alsoBuilt: CompactProject[] = [
  {
    title: 'Crop disease prediction',
    description: 'CNN with spatial attention classifying leaf images, deployed on Streamlit.',
    thumbnail: {
      src: '/images/crop-disease.png',
      alt: 'Crop disease prediction app — a classified leaf image with its predicted class',
    },
    links: [
      { label: 'Live demo', href: 'https://crop-disease.streamlit.app/' },
    ],
  },
  {
    title: 'Fraud detection system',
    description:
      'Random-forest classifier served as a serverless microservice for pre-settlement transaction screening.',
    thumbnail: {
      src: '/images/fraud-detection.png',
      alt: 'Fraud detection app — a transaction screened with its risk score',
    },
    links: [
      { label: 'Live demo', href: 'https://fraudml-app.streamlit.app/' },
    ],
  },
  {
    title: 'Sentiment analysis API',
    description: 'FastAPI service wrapping a quantized transformer for low-overhead sentiment scoring.',
    thumbnail: {
      src: '/images/sentiment-api.png',
      alt: 'Sentiment analysis API — a request and its scored response',
    },
    links: [
      { label: 'Repo', href: null },
    ],
  },
];

// ── Open source (§02) ─────────────────────────────────────────
export const openSource: OpenSourceEntry[] = [
  {
    title: 'Hackmamba Vault docs',
    role: 'Contributor',
    summary:
      'Merged 15 pull requests improving API endpoint examples in the core documentation repository.',
    link: { label: 'View repository', href: 'https://github.com/Gbolahan43/docs' },
  },
  {
    title: 'DXMentorship',
    role: 'Maintainer',
    summary: 'Maintain the core repository for a developer mentorship programme.',
    link: { label: 'View repository', href: 'https://github.com/Gbolahan43/dxmentorship' },
  },
];

// ── Thinking (§03) — essays + talks merged ───────────────────
export const thinking: ThinkingEntry[] = [
  {
    format: 'essay',
    title: 'Scaling AI with Amazon Bedrock AgentCore',
    venue: 'Dev.to',
    tags: ['agents', 'serverless'],
    link: null,
  },
  {
    format: 'essay',
    title: 'The Art of Instruction: A Comprehensive Guide to Prompt Engineering',
    venue: 'Dev.to',
    tags: ['prompt-engineering'],
    link: null,
  },
  {
    format: 'essay',
    title: 'Building Serverless RAG Pipelines with FastAPI',
    venue: 'LinkedIn',
    tags: ['retrieval', 'serverless'],
    link: null,
  },
  {
    format: 'talk',
    title: 'Deploying AI Solutions for Battery as a Service',
    venue: 'PowerElec Webinar · February 2026',
    tags: ['agents'],
    link: null,
  },
];

export const tagFilters: { label: string; tag: Tag | 'all' }[] = [
  { label: 'All', tag: 'all' },
  { label: 'agents', tag: 'agents' },
  { label: 'serverless', tag: 'serverless' },
  { label: 'retrieval', tag: 'retrieval' },
  { label: 'prompt-engineering', tag: 'prompt-engineering' },
];

// ── Community (§04) ──────────────────────────────────────────
export const community = {
  credential: 'AWS Community Builder · Year 4',
  body: 'I review cloud architectures for new members and publish technical guides on serverless ML deployment.',
};

// ── About (§05) ──────────────────────────────────────────────
export const about = {
  portrait: {
    src: '/images/portrait.svg',
    alt: 'Abdulbasit Olanrewaju',
  },
  paragraphs: [
    "I'm an AI/ML engineer in Lagos. Most of my work starts in the same place: a domain expert has knowledge that a system can't reach, buried in documents, images, or telemetry that don't fit cleanly into a database.",
    'I build the retrieval and agent layers that close that gap — usually on AWS, usually serverless, always with an eye on what each query actually costs. I care about the boring parts: whether the pipeline holds under real data, what it spends, and what it does when it\'s wrong.',
    "I'm an AWS Community Builder, now in my fourth year, and I write about what I learn shipping this work.",
  ],
};

// ── Contact (§06) ────────────────────────────────────────────
export const contact: ContactData = {
  heading: "Let's talk.",
  subline: 'Open to senior AI/ML roles — remote, hybrid, or on-site from Lagos.',
  email: null,
  secondaryLinks: [
    { label: 'GitHub', href: 'https://github.com/Gbolahan43' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdulbasit-olanrewaju-gbolahan' },
    { label: 'Résumé', href: 'abdulbasit-olanrewaju-resume.pdf' },
  ],
};
