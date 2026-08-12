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
  | 'hybrid'
  | 'computer-vision'
  | 'classification'
  | 'ensemble'
  | 'analytics'
  | 'nlp'
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
    /**
     * Measured figure — omitted where none exists. Never a bare number:
     * each carries the caveat that qualifies it (synthetic data, validation
     * split, training accuracy) in the same sentence.
     */
    result?: string;
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
      'A two-stage Retrieval-Augmented Generation pipeline on AWS Bedrock Knowledge Bases. A vision pass extracts symptoms from a leaf photo, then a retrieval step grounds the diagnosis in agronomic literature rather than the model\'s own knowledge.',
    outcome: {
      state: 'B',
      text: 'Returns localized, source-grounded diagnostic guidance from a corpus of agronomic documents.',
    },
    tags: ['retrieval', 'vision', 'serverless'],
    links: {
      repo: { label: 'Repo', href: 'https://github.com/Gbolahan43/AgriSabi' },
      demo: { label: 'Demo', href: 'https://master.d27jhgb9wlhqid.amplifyapp.com/' },
    },
    screenshot: {
      src: '/images/agrisabi.webp',
      alt: 'AgriSabi landing page — "Bridging the Gap Between Research and the African Farmer", with Home, Market and Assistant navigation',
      width: 1600,
      height: 900,
    },
    detail: {
      problem: 'Farmers lack immediate access to localized, science-backed diagnostic advice.',
      constraint:
        'A single model call asked to both read the photo and recall treatment knowledge risks inventing a diagnosis. Diagnosis needed to be split so the model never answers past what it actually retrieved.',
      decisions: [
        {
          n: '01',
          text: 'Two-stage vision-then-retrieval flow instead of one combined call — the vision pass extracts only physical symptoms, a separate retrieval step grounds the treatment answer in indexed agronomic sources.',
        },
        {
          n: '02',
          text: 'Bedrock Knowledge Bases (OpenSearch Serverless) over a self-managed vector store — managed retrieval kept the serverless footprint intact and removed index operations from scope.',
        },
      ],
      tradeoffs:
        'Chose a larger vision model to extract symptoms reliably, accepting higher per-call API cost over training and maintaining a bespoke image classifier on limited labelled data.',
      stack: ['Bedrock', 'Claude', 'FastAPI', 'App Runner'],
    },
  },
  {
    index: '01.2',
    title: 'ChainQuery AI',
    domain: 'Natural-language analytics over Solana on-chain data',
    system:
      'Converts natural-language questions into optimized DuneSQL (Trino) queries for Solana on-chain data, via a stateful LangGraph workflow that injects live schema and dialect rules into context. Guest access needs no signup; upgrades to a full account for persistent history.',
    outcome: {
      state: 'B',
      text: 'Non-technical stakeholders query Solana on-chain data without writing SQL.',
    },
    tags: ['agents', 'retrieval'],
    links: {
      repo: { label: 'Repo', href: 'https://github.com/Gbolahan43/chainquery-ai' },
      demo: { label: 'Demo', href: 'https://chainquery-app.onrender.com' },
    },
    screenshot: {
      src: '/images/chainquery.webp',
      alt: 'ChainQuery AI landing page — "Turn English into Blockchain Data", above a terminal showing the prompt "Show me top 10 SOL holders" and the SQL it generated',
      width: 1600,
      height: 900,
    },
    detail: {
      problem: 'Blockchain analytics demands complex SQL, locking out non-technical stakeholders.',
      constraint:
        'Solana\'s on-chain tables are deeply nested and DuneSQL/Trino has its own dialect quirks — a syntactically valid query can still be a wrong one, so correctness had to hold up against an unfamiliar schema and dialect, not just general SQL knowledge.',
      decisions: [
        {
          n: '01',
          text: 'A stateful LangGraph workflow over a single prompt-and-parse call — breaks generation into discrete Input → Prompt → LLM → SQL steps, injecting the actual database schema and DuneSQL syntax rules at each stage instead of relying on the model\'s memorized idea of Solana\'s schema.',
        },
        {
          n: '02',
          text: 'Hybrid guest and authenticated access — session-based guest access removes signup friction for a first query, with a seamless upgrade path to a JWT-authenticated account for persistent query history.',
        },
      ],
      tradeoffs:
        'Schema-aware generation is accurate for the Solana tables it knows, but the system is scoped to DuneSQL/Trino specifically — multi-chain support is on the roadmap, not built yet.',
      stack: ['DuneSQL', 'Solana', 'LangGraph'],
    },
  },
  {
    index: '01.3',
    title: 'FleetGuard',
    domain: 'Fleet telemetry monitoring for logistics operators',
    system:
      'Machine-learning anomaly detection over real-time vehicle telemetry — fuel theft, route deviation, private use, excessive idling — with Amazon Bedrock (Claude) turning each flagged event into a plain-language incident report for dispatchers.',
    outcome: {
      state: 'A',
      value: 'Fifth place · One with AI hackathon',
      method: 'Externally judged placement',
    },
    tags: ['anomaly-detection', 'hybrid'],
    links: {
      repo: { label: 'Repo', href: null },
      demo: { label: 'Demo', href: null },
    },
    screenshot: {
      src: '/images/fleetguard.webp',
      alt: 'FleetGuard live map — a Lagos fleet dashboard with active-vehicle, alert and fuel-theft counters, a vehicle list, and Bedrock-written incident reports beside a flagged route',
      width: 1600,
      height: 900,
    },
    detail: {
      problem: 'Logistics operators lose revenue to undetected fuel theft and route abuse.',
      constraint:
        'Two very different access patterns had to share one model — a fleet manager watching a live map in real time, and an analyst auditing a full day\'s trip logs after the fact. Same scoring logic, two very different latency and throughput needs.',
      decisions: [
        {
          n: '01',
          text: 'Unsupervised IsolationForest over a supervised classifier — no labelled production incident data existed to train on, so detection had to work without ground-truth theft or abuse examples.',
        },
        {
          n: '02',
          text: 'Two deployment paths sharing one scoring core — Lambda for live telemetry pings, App Runner for batch CSV analysis — with identical feature engineering and parity-tested scoring so live and offline results can\'t silently diverge.',
        },
      ],
      tradeoffs:
        'Prioritized recall over precision (0.998 vs. 0.990) since a missed theft costs more than a reviewed false positive, raising the manual-review load on dispatchers for borderline cases.',
      result:
        'F1 0.994 on mock Lagos fleet telemetry (10 vehicles, ~4,800 pings, ~12% injected anomalies) — not yet validated against real production data.',
      stack: ['Bedrock', 'Lambda', 'App Runner'],
    },
  },
  {
    index: '01.4',
    title: 'PlantGuard',
    domain: 'Leaf disease diagnosis from a photo',
    system:
      'A CNN image classifier that identifies 38 leaf-disease classes across 14 crop species from a single photo, served through a Streamlit app with a confidence floor to catch out-of-domain images.',
    outcome: {
      state: 'B',
      text: 'Classifies 38 leaf-disease classes across 14 crop species from a single photo.',
    },
    tags: ['computer-vision', 'classification'],
    links: {
      repo: { label: 'Repo', href: 'https://github.com/Gbolahan43/crop-disease-app' },
      demo: { label: 'Demo', href: 'https://crop-disease.streamlit.app/' },
    },
    screenshot: {
      src: '/images/crop-disease.webp',
      alt: 'PlantGuard app — "Know what is wrong with your leaf" above a leaf photo, with a sidebar showing the active model: 38 classes, 14 crops, 0.977 validation accuracy',
      width: 1600,
      height: 900,
    },
    detail: {
      problem:
        'Diagnosing crop disease from a photo, without waiting on an agronomist, using nothing more than a phone camera.',
      constraint:
        'The classifier is closed-world — softmax over 38 classes always returns one of them confidently, even for a photo of something it\'s never seen. A confidence floor catches likely off-domain cases but can\'t eliminate a confident wrong answer.',
      decisions: [
        {
          // The deployed app's sidebar reads "newplantdis.keras · 0.977 validation
          // accuracy", which matches this checkpoint — README flag 7 resolved in
          // favour of the stronger model.
          n: '01',
          text: 'Selected the 5-epoch checkpoint over the 10-epoch one — the longer run\'s validation accuracy regressed sharply on its final epoch (98.2% to 88.6%) while validation loss nearly quintupled, and the weights were saved after the regression rather than at the best epoch.',
        },
        {
          n: '02',
          text: 'One shared class registry across three Streamlit front-ends — keeps the 38 labels and model path in one place so label order can\'t drift between UI iterations.',
        },
      ],
      tradeoffs:
        'The headline accuracy is measured on the validation split, which was also used to monitor training — there\'s no untouched held-out test set, so treat it as an optimistic estimate rather than a true generalization number.',
      result:
        '97.7% validation accuracy across 38 classes (macro F1 0.98) on PlantVillage\'s lab-condition photos. Field photography will likely score lower.',
      stack: ['Keras', 'TensorFlow', 'Streamlit'],
    },
  },
];

// ── Also built (compact) ─────────────────────────────────────
export const alsoBuilt: CompactProject[] = [
  {
    title: 'Fraud detection system',
    description:
      'Flags suspicious users on a crypto trading platform from deposit, withdrawal and trade behavior, using a three-model consensus (Logistic Regression, Random Forest, XGBoost) that assigns a Low/Medium/High/Extreme risk level. Only 0.42% of users are actually suspicious, so the app scores itself on recall and precision over a held-out split rather than quoting an accuracy figure.',
    thumbnail: {
      src: '/images/fraud-detection.webp',
      alt: 'Fraud detection dashboard — total users, suspicious users and fraud-rate tiles over a crypto trading dataset, with all three models loaded',
    },
    links: [
      { label: 'Live demo', href: 'https://fraudml-app.streamlit.app/' },
      { label: 'Repo', href: 'https://github.com/Gbolahan43/fraud-detection-system' },
    ],
  },
  {
    title: 'Sentiment analysis API',
    description:
      'A FastAPI service classifying text as positive, negative or neutral, backed by a TF-IDF and Logistic Regression baseline with a 1,024-entry LRU cache in front of inference and a DistilBERT option kept in reserve.',
    thumbnail: {
      src: '/images/sentiment-api.webp',
      alt: 'Sentiment Analysis API README — a REST API classifying text sentiment, with CI passing, Python, FastAPI and MIT license badges',
    },
    links: [
      { label: 'Repo', href: 'https://github.com/Gbolahan43/Sentiment-Analysis-API' },
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
    src: '/images/portrait.png',
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
