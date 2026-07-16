import { connectDb, disconnectDb } from "../config/db";
import { env } from "../config/env";
import { ExperienceModel } from "../models/experience";
import { ProjectModel } from "../models/project";
import { ExperienceKind, ProjectCategory } from "@portfolio/shared";

const experiences = [
  {
    org: "Byldd",
    role: "Associate Full Stack Engineer",
    kind: ExperienceKind.Work,
    location: "Remote · New York, US",
    startDate: "Jun 2026",
    endDate: null,
    order: 1,
    highlights: [
      "Building scalable, high-performance web applications on the MERN stack and Next.js.",
      "Working across real-time systems and robust backend architectures with TypeScript.",
    ],
  },
  {
    org: "Byldd",
    role: "Full Stack Engineer Intern",
    kind: ExperienceKind.Work,
    location: "Remote · New York, US",
    startDate: "Sep 2025",
    endDate: "Mar 2026",
    order: 2,
    highlights: [
      "Built full-stack features with Next.js and React.js.",
      "Seven-month internship that converted into a full-time role.",
    ],
  },
  {
    org: "Rajeev Institute of Technology, Hassan",
    role: "B.E., Computer Science & Engineering",
    kind: ExperienceKind.Education,
    startDate: "Dec 2021",
    endDate: "Aug 2025",
    order: 3,
    highlights: [
      "CGPA 8.75.",
      "Foundations in DSA, OOP, DBMS, OS, and computer networks; hands-on full-stack web development.",
    ],
  },
  {
    org: "Sujala Pre University College, Hassan",
    role: "Pre-University (PCM)",
    kind: ExperienceKind.Education,
    startDate: "Apr 2020",
    endDate: "Apr 2021",
    order: 4,
    highlights: ["Grade 98.9%."],
  },
];

const projects = [
  {
    slug: "pokevault",
    title: "PokeVault — Pokédex Search Engine",
    category: ProjectCategory.FullStack,
    summary: "Full-stack Pokédex with autocomplete search and smart caching.",
    description:
      "A full-stack Pokédex built with Next.js, Express, and TypeScript. Search Pokémon by name or ID with autocomplete, view rich stats, abilities, types, and artwork, and enjoy fast repeat requests via an LRU cache with TTL. Shared TypeScript models keep the frontend and backend in sync — a clean MVC architecture that mirrors production practices.",
    techTags: ["Next.js", "Express", "TypeScript", "LRU Cache", "PokéAPI", "MVC"],
    coverImage: "/projects/pokevault.webp",
    liveUrl: null,
    githubUrl: "https://github.com/sagarbj3245/PokeVault",
    order: 1,
  },
  {
    slug: "expensetracker",
    title: "ExpenseTracker",
    category: ProjectCategory.FullStack,
    summary: "Expense manager with payments, email, and cloud deployment.",
    description:
      "A full-stack expense manager with JWT auth, add/view/delete expenses, premium membership via the Cashfree payment gateway, leaderboard and reports, and password reset over email using Brevo. Built on Node.js, Express, and MySQL/Sequelize following the MVC pattern, and deployed on AWS (EC2, S3, IAM, RDS).",
    techTags: ["Node.js", "Express", "MySQL", "Sequelize", "JWT", "Cashfree", "Brevo", "AWS"],
    coverImage: "/projects/expensetracker.png",
    liveUrl: "http://13.233.15.15:3000/",
    githubUrl: "https://github.com/sagarbj3245/ExpenseTracker",
    order: 3,
  },
  {
    slug: "ai-assistant-sid",
    title: "AI Assistant — Sid",
    category: ProjectCategory.AI,
    summary: "A Google Gemini–powered conversational AI chatbot.",
    description:
      "A React web app that acts as a Google Gemini AI chatbot, with a clean conversational interface and a simulated typing effect for a natural feel. Built with React and CSS, integrating the Gemini model for informative, real-time responses.",
    techTags: ["React", "Google Gemini API", "CSS"],
    coverImage: "/projects/ai-assistant-sid.png",
    liveUrl: "https://ai-assistant-sid-927s.vercel.app/",
    githubUrl: "https://github.com/sagarbj3245/AI-Assistant-Sid",
    order: 4,
  },
  {
    slug: "sitesculptor",
    title: "SiteSculptor — Build Websites with AI",
    category: ProjectCategory.AI,
    summary: "Describe a site in plain English and generate it with AI.",
    description:
      "An AI website builder — describe the website you want and generate production-ready output with AI assistance, plus an enhance step to refine your prompt. A modern, dark, developer-focused interface for turning ideas into sites fast.",
    techTags: ["Next.js", "AI", "TypeScript"],
    coverImage: "/projects/sitesculptor.jpg",
    liveUrl: "https://site-sculptor-etfb.vercel.app/",
    githubUrl: "https://github.com/sagarbj3245/SiteSculptor",
    order: 5,
  },
];

async function seed() {
  await connectDb(env.mongoUri);
  await ExperienceModel.deleteMany({});
  await ExperienceModel.insertMany(experiences);
  await ProjectModel.deleteMany({});
  await ProjectModel.insertMany(projects);
  // eslint-disable-next-line no-console
  console.log(`Seeded ${experiences.length} experiences and ${projects.length} projects`);
  await disconnectDb();
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Seed failed:", err);
  process.exit(1);
});
