// Initial content for a fresh dataset, taken from Steven's CV (2026), LinkedIn
// and GitHub READMEs. Once seeded, Studio is the source of truth: edit there,
// not here.

export const profile = {
  name: 'Steven Lagadapati',
  role: 'AI & Automation Engineer',
  tagline: 'LLM agents, MCP integrations and marketing data automation',
  heroDescription:
    'I build LLM agents and data pipelines that work on live business systems: ad platforms, Google Slides, WordPress and Shopify. My agents check their numbers against the source data, and nothing gets written until a person signs off.',
  aboutDescription:
    "I'm an AI & Automation Engineer at Blue Forest Digital, a performance marketing agency, where I automate reporting for about 25 client accounts and build Claude Agent SDK agents and MCP integrations. I work end to end in Python, TypeScript and Next.js. Before that I built LLM content pipelines at ThinkBubble and analyzed futures and options data at Futures First. I hold an M.S. in Data Science and Analytics from Florida Atlantic University.",
  email: 'stevenlagadapati1012@gmail.com',
  location: 'Florida, USA',
  availability: 'Open to new opportunities',
  certifications: [
    '4th Place, Celesta 2025 Innovation Hackathon',
    'Generative AI with LLMs (Coursera)',
    'Google Cloud Data Analytics',
    'IBM Data Science',
  ],
  githubUrl: 'https://github.com/Stevenshanmukh',
  linkedinUrl: 'https://www.linkedin.com/in/steven-lagadapati',
}

export const siteSettings = {
  title: 'Steven Lagadapati | AI & Automation Engineer',
  description:
    'Steven Lagadapati builds LLM agents, MCP integrations and marketing data automation in Python, TypeScript and Next.js. Projects, experience and resume.',
  url: 'https://stevenlagadapati.vercel.app',
  keywords: [
    'Steven Lagadapati',
    'AI Engineer',
    'Automation Engineer',
    'LLM Agents',
    'Claude Agent SDK',
    'MCP',
    'RAG',
    'Marketing Data Automation',
    'Python',
    'TypeScript',
    'Next.js',
    'Data Science',
    'Florida',
  ],
}

export const experience = [
  {
    role: 'AI & Automation Engineer',
    company: 'Blue Forest Digital',
    companyUrl: 'https://www.blueforestdigital.com',
    period: 'May 2026 – Present',
    location: 'Remote',
    summary:
      'Performance marketing agency running Google Ads, Meta, Bing and SEO for ecommerce, DTC and B2B clients.',
    highlights: [
      'Built a Claude Agent SDK reporting agent that refreshes client Google Slides decks from live ad data. Source files stay read-only, and a person approves the plan before any write. Phase 1 shipped with 23 passing automated tests.',
      'Automated daily and monthly reporting for about 25 client accounts, piping Windsor.ai ad data into Sheets dashboards, Slides decks and a weekday Slack pacing digest. Every AI summary is checked against the source data.',
      "Shipped a prospect audit platform that scores a company's paid ads, SEO, AI-search visibility and site quality from public data, then produces a branded outreach PDF for about $0.30 per audit.",
      'Built a WordPress MCP gateway that lets AI assistants edit and roll back client site content with no per-employee credentials, chosen over four other architectures after read, edit and rollback tests.',
      'Fixed four inherited data-integrity failures in a Shopify and Sage X3 B2B sync that replaces legacy Workato workflows, adding safeguards that block unsafe updates and flag ambiguous company records.',
      'Built a RAG chatbot over team meeting notes with hybrid pgvector search, Claude query rewriting and Google Drive sync.',
    ],
    skills: ['Claude Agent SDK', 'MCP', 'Python', 'TypeScript', 'Next.js', 'PostgreSQL', 'Windsor.ai'],
  },
  {
    role: 'AI Engineer Intern',
    company: 'ThinkBubble',
    period: 'Jan 2026 – May 2026',
    location: 'Deerfield Beach, FL · Hybrid',
    summary: 'Design studio and product incubator.',
    highlights: [
      'Built LLM content-generation pipelines using multi-stage prompt chaining and vector retrieval.',
      'Helped take Aiparel, a studio product, from concept to working build across Django APIs, cloud deployment and the front end, restructuring its backend into modular services.',
      'Replaced repetitive content-ops tasks with Make.com and n8n automations.',
    ],
    skills: ['LLMs', 'Prompt chaining', 'Vector retrieval', 'Django', 'Make.com', 'n8n'],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Futures First',
    period: 'May 2023 – Dec 2023',
    location: 'India',
    summary: 'Global derivatives trading and analytics.',
    highlights: [
      "Analyzed futures and options data in Pandas and NumPy to surface price trends, volatility and trading signals, and built reports for the team's risk and strategy reviews.",
    ],
    skills: ['Python', 'Pandas', 'NumPy'],
  },
]

// Order here is the order of the filter tabs.
export const projectCategories = ['AI & Automation', 'Full-Stack', 'Machine Learning', 'Analytics & BI']

type SeedProject = {
  title: string
  description: string
  longDescription: string
  categories: string[]
  tags: string[]
  githubUrl?: string
  demoUrl?: string
  featured: boolean
}

const gh = (repo: string) => `https://github.com/Stevenshanmukh/${repo}`

// Order here is the display order. It mixes categories so the first six
// cards show the full range.
export const projects: SeedProject[] = [
  {
    title: 'MedIntel AI',
    description:
      'Clinical RAG system that turns doctor-patient visit transcripts into structured data. Questions about medications or first mentions go to SQL, narrative questions go to retrieval, and unsafe questions get refused.',
    longDescription:
      "Extracts clinical entities from visit transcripts with scispaCy and negation detection, stores them in Postgres with pgvector, and routes each question to SQL or to RAG with cross-encoder reranking. It compares visits over time, flags risks such as symptom escalation, new medications and drug interactions, and shows a patient timeline. Ten failure cases and their fixes are documented in the repo. Built on synthetic patient data, and still in progress.",
    categories: ['AI & Automation'],
    tags: ['FastAPI', 'PostgreSQL', 'pgvector', 'LangChain', 'scispaCy', 'Next.js', 'Docker'],
    githubUrl: gh('medintel-ai'),
    featured: true,
  },
  {
    title: 'CartBuddy',
    description:
      'Shared shopping lists for households and roommates. Changes sync live across phones, and the list keeps working offline and catches up when the connection returns.',
    longDescription:
      "A mobile-first PWA with live presence, an offline queue in IndexedDB, invites and an activity feed. Row-level security in Supabase keeps each household's data separate. Built with Next.js 16, Supabase Realtime and Auth, Zustand and React Query, with Vitest tests and GitHub Actions CI.",
    categories: ['Full-Stack'],
    tags: ['Next.js', 'Supabase', 'TypeScript', 'PWA', 'Zustand', 'Vitest'],
    githubUrl: gh('Cartbuddy'),
    demoUrl: 'https://cartbuddy-one.vercel.app',
    featured: true,
  },
  {
    title: 'UI/UX Design Consultant Skill',
    description:
      'A Claude Code skill that audits a frontend in six phases, scores it across 12 categories, and refactors the code to fix hierarchy, spacing, contrast and accessibility problems.',
    longDescription:
      "Python scripts check spacing, color and WCAG contrast, typography, accessibility and responsiveness, and a stack detector adapts the advice to the project's framework. The skill turns the audit into an improvement plan, applies the changes, and writes a changelog.",
    categories: ['AI & Automation'],
    tags: ['Claude Code', 'Python', 'Accessibility', 'WCAG'],
    githubUrl: gh('Claude_UI-UX-Design-Consultant-Skill'),
    featured: false,
  },
  {
    title: 'Vehicle Price Prediction',
    description:
      'XGBoost model that predicts used-car sale prices from 558,825 vehicle sales, tuned with Optuna to a test R² of 0.968, with drift monitoring and a Streamlit app.',
    longDescription:
      'Trained on the Kaggle car prices dataset and tuned over 50 Optuna trials. Includes explainability and fairness breakdowns, a simulated drift monitor (KS test, PSI and chi-square), and an interactive Streamlit dashboard for price estimates.',
    categories: ['Machine Learning'],
    tags: ['Python', 'XGBoost', 'Optuna', 'scikit-learn', 'Streamlit'],
    githubUrl: gh('vehicle-sales-prediction'),
    demoUrl: 'https://vehicle-sales-prediction.streamlit.app',
    featured: true,
  },
  {
    title: 'n8n AI Automation Workflows',
    description:
      'Nine importable n8n workflows for common business jobs: support routing, lead scoring, onboarding, invoice approval, CRM enrichment, email sequences, daily ops reports, candidate screening and a supply-chain agent.',
    longDescription:
      'Each workflow uses OpenAI nodes with webhook or schedule triggers, and external services are mocked so it runs straight after import. I built them with an AI agent through n8n-MCP, and the repo includes the MCP setup, a test report and an audit report.',
    categories: ['AI & Automation'],
    tags: ['n8n', 'OpenAI', 'MCP', 'JavaScript'],
    githubUrl: gh('n8n-ai-automation'),
    featured: false,
  },
  {
    title: 'VettedCV',
    description:
      'AI career workspace: paste a job description to get a match score and ATS keyword check, tailor your resume to it, and track applications on a Kanban board.',
    longDescription:
      'Users bring their own API key for OpenAI, Anthropic, Google or Perplexity, and the backend encrypts it. Next.js and shadcn on the front end; a TypeScript Node API with Prisma, PostgreSQL, rate limiting and Swagger docs on the back end.',
    categories: ['AI & Automation', 'Full-Stack'],
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'OpenAI', 'Claude'],
    githubUrl: gh('vetted-cv'),
    featured: false,
  },
  {
    title: 'Pneumonia X-ray Classification',
    description:
      'Compared a CNN baseline, DenseNet121, EfficientNet-B0 and ViT-B/16 for spotting pneumonia in pediatric chest X-rays. The ViT reached 92.31% accuracy and 98.21% sensitivity.',
    longDescription:
      'Transfer learning in PyTorch on the Kermany pediatric chest X-ray dataset, with Albumentations augmentation. The ViT scored 0.978 AUC, Grad-CAM heatmaps show which regions drove each prediction, and the models export to ONNX for a Streamlit demo app.',
    categories: ['Machine Learning'],
    tags: ['PyTorch', 'Vision Transformer', 'Grad-CAM', 'ONNX', 'Streamlit'],
    githubUrl: gh('pneumonia-xray-classification'),
    featured: true,
  },
  {
    title: 'PaylessCars',
    description:
      'Car marketplace where buyers and dealers negotiate with offers and counter-offers. Separate dashboards for buyers, dealers and admins, plus side-by-side comparison and saved cars.',
    longDescription:
      'Next.js front end with a Django REST Framework API split into accounts, dealers, vehicles, negotiations, notifications and analytics apps. Dealers can bulk-upload inventory from CSV, and auth uses JWT. Runs in Docker behind Nginx and Gunicorn on PostgreSQL.',
    categories: ['Full-Stack'],
    tags: ['Next.js', 'TypeScript', 'Django REST', 'PostgreSQL', 'Docker'],
    githubUrl: gh('Paylesscars'),
    featured: false,
  },
  {
    title: 'DataAnalyze Skill',
    description:
      'A Claude Code skill that runs exploratory data analysis on any dataset: profiling, outlier and correlation checks, feature importance, and an interactive HTML report.',
    longDescription:
      'Works as a skill or as a standalone Python pipeline. It detects column types, domain and target, ranks drivers with Random Forest and permutation importance (SHAP optional), suggests hypotheses to test, and writes the findings as JSON plus a Plotly report.',
    categories: ['AI & Automation'],
    tags: ['Claude Code', 'Python', 'scikit-learn', 'SHAP', 'Plotly'],
    githubUrl: gh('DataAnalyze_Claude-Skill'),
    featured: false,
  },
  {
    title: 'GhostWriter',
    description:
      'Offline dictation for Windows 11. Press F8, speak, and Whisper transcribes on your machine and pastes the text into whatever app is open. Nothing goes to the cloud.',
    longDescription:
      'Runs whisper.cpp locally with a small desktop window and a tray icon, so it works in Word, Discord, a browser or anything else that takes text.',
    categories: ['AI & Automation'],
    tags: ['Python', 'Whisper', 'customtkinter'],
    githubUrl: gh('Ghost_writer'),
    featured: false,
  },
  {
    title: 'Brief Digest',
    description:
      'No-code weekly newsletter. Readers pick a country and topics, Perplexity writes a digest for each group, and Make.com sends it.',
    longDescription:
      'A Base44 landing page sends signups through NoCodeAPI into Google Sheets. One Make.com scenario has Perplexity Sonar write an HTML newsletter for each country and category pair and caches it; a second sends the emails over SMTP and logs every send.',
    categories: ['AI & Automation'],
    tags: ['Make.com', 'Perplexity', 'Google Sheets', 'Base44'],
    githubUrl: gh('Brief_Digest'),
    demoUrl: 'https://briefdigest.base44.app',
    featured: false,
  },
  {
    title: 'Anime Recommender',
    description:
      'Recommends anime from 19,931 MyAnimeList titles. FAISS finds similar candidates, a LightGBM ranker orders them, and SHAP explains why each pick made the list.',
    longDescription:
      'Combines TF-IDF text features with studio and producer graph features, retrieves 50 candidates per query with FAISS, and re-ranks them with LightGBM LambdaRank over 20 features. The four-page Streamlit app takes one title or several and shows the reasoning behind every recommendation.',
    categories: ['Machine Learning'],
    tags: ['LightGBM', 'FAISS', 'SHAP', 'scikit-learn', 'Streamlit'],
    githubUrl: gh('Anime-Recommender-System'),
    demoUrl: 'https://anime-recommender-system-1.streamlit.app',
    featured: false,
  },
  {
    title: 'Meet Your Macros',
    description:
      'Local-first nutrition tracker that works out your calorie and macro targets, helps you build meals, and tracks the day. Your data stays in the browser.',
    longDescription:
      'Calculates TDEE, BMR and lean body mass, then sets macro targets. Built with Next.js, React 19, Tailwind CSS v4 and Zustand, with unit tests in Vitest and end-to-end tests in Playwright.',
    categories: ['Full-Stack'],
    tags: ['Next.js', 'TypeScript', 'Zustand', 'Vitest', 'Playwright'],
    githubUrl: gh('Meet-Your-Macros'),
    demoUrl: 'https://meet-your-macros.vercel.app',
    featured: false,
  },
  {
    title: 'Retail Analytics',
    description:
      'Ten notebooks on a 1M-row retail dataset covering sales forecasting, price elasticity, customer segmentation and lifetime value, with a multi-page Streamlit dashboard.',
    longDescription:
      'Starts with exploratory analysis of a retail star schema, forecasts demand with ARIMA and SARIMA, measures price elasticity, segments customers with K-Means, and estimates customer lifetime value. The Streamlit app puts the results in front of business users.',
    categories: ['Analytics & BI'],
    tags: ['Python', 'statsmodels', 'scikit-learn', 'Plotly', 'Streamlit'],
    githubUrl: gh('Retail-analytics-project'),
    featured: false,
  },
  {
    title: 'Power BI Dashboards',
    description:
      'Four interactive Power BI dashboards on ecommerce sales, HR and people analytics, IMDb films, and sales performance.',
    longDescription:
      'Each dashboard ships with its .pbix file, dataset and notes. The models use DAX measures, and the IMDb data was prepared in Python first.',
    categories: ['Analytics & BI'],
    tags: ['Power BI', 'DAX', 'Python'],
    githubUrl: gh('Power_bi'),
    featured: false,
  },
]

export const skillCategories = [
  {
    name: 'AI / LLM',
    icon: 'Brain',
    description: 'Agents and retrieval systems that act on live data, with checks before they write.',
    items: [
      'Claude Agent SDK',
      'Anthropic API',
      'OpenAI API',
      'MCP (servers and clients)',
      'RAG',
      'Hybrid vector search (pgvector, FAISS)',
      'Embeddings',
      'Multi-agent workflows',
      'LLM QA gates',
    ],
  },
  {
    name: 'Languages',
    icon: 'Code',
    description: 'What the agents, pipelines and apps are written in.',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    name: 'Full-Stack',
    icon: 'Layers',
    description: 'The web apps and APIs around the automation.',
    items: [
      'Next.js (App Router)',
      'React',
      'Tailwind CSS',
      'Django REST Framework',
      'Flask',
      'REST APIs',
      'Google OAuth',
      'Vitest',
      'Playwright',
    ],
  },
  {
    name: 'Data & Cloud',
    icon: 'Cloud',
    description: 'Where the data lives and the code runs.',
    items: [
      'PostgreSQL',
      'Supabase',
      'Redis',
      'Vercel',
      'Railway',
      'Google Cloud (Cloud Run, Secret Manager)',
      'Docker',
      'GitHub Actions',
    ],
  },
  {
    name: 'Integrations',
    icon: 'Plug',
    description: 'Platforms I pull data from and push changes to.',
    items: [
      'Windsor.ai',
      'Google Ads',
      'Meta Ads',
      'Bing Ads',
      'Triple Whale',
      'Shopify',
      'Google Workspace APIs',
      'Apps Script',
      'WordPress REST API',
      'Slack',
      'Apify',
      'DataForSEO',
      'n8n',
      'Make.com',
    ],
  },
  {
    name: 'ML & Reporting',
    icon: 'BarChart3',
    description: 'Models, their explanations, and the decks and PDFs that present them.',
    items: ['scikit-learn', 'PyTorch', 'LightGBM', 'SHAP', 'Pandas', 'NumPy', 'python-pptx', 'PptxGenJS', 'PDF generation'],
  },
]

export const education = [
  {
    institution: 'Florida Atlantic University',
    degree: 'M.S. Data Science and Analytics',
    period: 'Jan 2026',
    status: 'GPA 3.8/4.0',
  },
  {
    institution: 'Lovely Professional University',
    degree: 'B.Tech (Honors) Computer Science',
    period: 'May 2023',
  },
]
