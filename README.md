# CodeMaster

**A full-stack interactive Python learning platform with AI-powered Socratic tutoring and trilingual support.**

Built with Next.js, TypeScript, Tailwind CSS, Pyodide (in-browser Python), and OpenRouter AI.

---

## What This Is

CodeMaster is a production-grade web application that teaches Python programming through four integrated learning modes:

- **Theory** — 17 structured lessons from fundamentals to machine learning
- **Practice** — Live Python editor running directly in the browser
- **Challenges** — 26 algorithmic problems with starter code
- **Assessments** — Timed quizzes with 200+ questions across topic pools

An AI tutor using the Socratic method guides students through problems without giving away answers — asking targeted questions, giving minimal hints, and forcing deeper thinking.

The platform supports **three languages**: English, Russian, and Kazakh. The first three theory modules (Variables & Data Types, Control Structures, Functions) and their corresponding quiz questions are fully translated into Kazakh. All UI, navigation, topic descriptions, and challenge descriptions are available in all three languages.

---

## Key Features

### In-Browser Python Execution
Students write and run Python 3.11 code without installing anything. Powered by [Pyodide](https://pyodide.org/), the interpreter runs entirely client-side with real stdout capture, error surfacing, and keyboard shortcuts (Ctrl+Enter to execute).

### Socratic AI Tutor
The AI assistant is designed around pedagogical principles — it never gives complete solutions. Instead, it:
- Asks 1-2 guiding questions that lead students toward the answer
- Points out *what* is wrong without showing *how* to fix it
- Keeps responses to 2-4 sentences maximum
- Understands the student's current code context and challenge description

Built as a chat interface with conversation history, typing indicators, and message bubbles. Powered by OpenRouter (Gemini 2.5 Flash).

### Trilingual Interface (EN / RU / KK)
A custom i18n system built with React Context — no heavy libraries. Features:
- Auto-detects browser language on first visit
- Persists preference in localStorage
- Lazy-loads translation namespaces per page for performance
- Falls back to English for untranslated content
- Language switcher accessible from every page

**Full Kazakh translation coverage:**
- All navigation, footer, buttons, and UI elements
- Landing page, theory hub, practice arena, challenges hub
- Theory lessons: Variables & Data Types, Control Structures, Functions
- Quiz questions for the above three topics (60+ translated questions)
- All 26 challenge titles and descriptions

### 17 Theory Modules

| Stage | Topics |
|-------|--------|
| **Foundation** | Variables & Data Types, Control Structures, Functions, String Manipulation |
| **Intermediate** | Data Structures, OOP, File Handling, Modules & Packages |
| **Advanced** | API Integration, Databases & SQL, Decorators, Testing & Debugging |
| **Projects** | Web Scraping, Data Analysis, REST API Development, Machine Learning |

Each lesson includes section-based sidebar navigation, rich explanations, interactive code examples, and links to the corresponding quiz.

### 200+ Quiz Questions
Timed 30-minute assessments with:
- Randomized question selection from deep pools (20-44 questions per topic)
- Real-time progress tracking and question navigation grid
- Detailed results with score, per-question review, and explanations
- Questions cover easy, medium, and hard difficulty levels

### 26 Coding Challenges
Algorithm problems ranging from Two Sum to Trapping Rain Water:
- Each challenge has a description, difficulty rating, and starter code
- Side-by-side layout: code editor (2/3) + AI tutor chat (1/3)
- Students can ask the AI for hints without receiving direct answers

### Practice Arena
- 11 curated code examples across Basics, Data Structures, Functions, OOP, and more
- Filterable by category and difficulty
- Fullscreen focus mode hides all navigation
- Integrated AI chat panel for contextual help

---

## Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Framework | Next.js 12 (Pages Router) | SSG/SSR, API routes, file-based routing |
| Language | TypeScript 5.8 | Type safety across components and data |
| Styling | Tailwind CSS 3.4 | Utility-first responsive design |
| Python Runtime | Pyodide 0.24 | CPython 3.11 compiled to WebAssembly |
| AI | OpenRouter API (Gemini 2.5 Flash) | Socratic tutoring with context injection |
| Animations | Custom scroll observers + CSS | Fade, slide, scale transitions on viewport entry |
| Rendering | react-markdown + remark-breaks | Safe markdown rendering for AI responses |
| 3D Effects | OGL (WebGL) | Shader-based hero background animation |

---

## Project Structure

```
├── components/
│   ├── Layout.tsx                 # Nav, footer, language switcher
│   ├── AIChatPanel.tsx            # Chat-style AI tutor interface
│   ├── PythonInterpreter.tsx      # Code editor + console
│   ├── LanguageSwitcher.tsx       # EN/RU/KK dropdown
│   ├── AnimatedDashboard.tsx      # Progress visualization
│   ├── ScrollAnimation.tsx        # Viewport-triggered animations
│   ├── DarkVeil.tsx               # WebGL hero background
│   └── AIAnimation.tsx            # AI section visual
├── contexts/
│   ├── LanguageContext.tsx         # i18n provider, useTranslation hook
│   └── PyodideProvider.tsx        # Python runtime provider
├── pages/
│   ├── index.tsx                  # Landing page
│   ├── theory.tsx                 # Theory hub (17 topics)
│   ├── theory/*.tsx               # Individual lesson pages
│   ├── practice.tsx               # Code practice arena
│   ├── challenges.tsx             # Challenge hub
│   ├── challenge/[id].tsx         # Challenge solver + AI
│   ├── test/[topic].tsx           # Timed quiz engine
│   └── api/askAI.ts               # AI endpoint (OpenRouter)
├── public/locales/
│   ├── en/                        # English translations
│   ├── ru/                        # Russian translations
│   └── kk/                        # Kazakh translations
├── data/challenges.ts             # 26 challenge definitions
├── .env.local                     # API keys (gitignored)
└── .gitignore
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Production build
npm run build && npm start
```

### AI Setup
Create `.env.local` in the project root:
```
OPENROUTER_API_KEY=your_key_here
```
The AI tutor works with any OpenRouter-compatible model. Default: `google/gemini-2.5-flash`.

---

## How It Works

```
Student Journey:

  Theory Lesson → Practice Examples → AI Guidance → Coding Challenge → Timed Quiz
       ↑                                                                    |
       └────────────────────── Review & Repeat ─────────────────────────────┘
```

1. **Read** structured theory with code walkthroughs
2. **Practice** with curated examples in the live interpreter
3. **Ask** the AI tutor when stuck — it responds with questions, not answers
4. **Solve** algorithmic challenges with the AI available as a thinking partner
5. **Test** knowledge with timed, randomized assessments
6. **Review** detailed explanations for every question

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Optimized production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint checks |
| `npm run clean` | Remove `.next` build artifacts |

---

## Acknowledgements

- [Pyodide](https://pyodide.org/) for making Python run in the browser
- [OpenRouter](https://openrouter.ai/) for unified LLM API access
- [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) for the development foundation

---

*Built by kametaytoktar*
