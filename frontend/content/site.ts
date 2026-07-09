// Non-DB site content (hero/about/skills/socials/nav). DB-driven content
// (projects, experience) is served by the API. Demonstrates TS interfaces,
// type aliases, and typed arrays.

export interface SocialLink {
  label: string;
  href: string;
}

export interface PhoneLink {
  label: string;
  display: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillGroup {
  area: string;
  items: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export interface SiteContent {
  name: string;
  role: string;
  location: string;
  availability: string;
  specializations: string[];
  building: string[];
  bio: string;
  email: string;
  phones: PhoneLink[];
  socials: SocialLink[];
  nav: NavItem[];
  skillGroups: SkillGroup[];
  certificates: Certificate[];
  cvPath: string;
}

export const site: SiteContent = {
  name: "Sagar B J",
  role: "Associate Full Stack Engineer",
  location: "Bengaluru, India",
  availability: "Available for freelance & full-time",
  specializations: ["MERN Stack", "Next.js", "TypeScript", "Real-Time Systems"],
  building: ["real-time systems", "AI assistants", "full-stack web apps", "developer tools"],
  bio: "Associate Full Stack Engineer at Byldd. I take products end-to-end — choosing the right stack, building scalable, high-performance web applications with the MERN stack, Next.js, and TypeScript, then deploying and maintaining them in production. I specialize in real-time systems and robust backend architectures, and I work directly with clients to turn their ideas into shipped software.",
  email: "sagarbj001@gmail.com",
  phones: [
    { label: "WhatsApp", display: "+91 82773 34654", href: "https://wa.me/918277334654" },
    { label: "Call", display: "+91 93809 83016", href: "tel:+919380983016" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/sagarbj3245" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sagar-b-j-2855b3319/" },
    { label: "X", href: "https://x.com/sagar_bj01" },
    { label: "Instagram", href: "https://www.instagram.com/sagardrops/" },
  ],
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Certificates", href: "#certificates" },
    { label: "Contact", href: "#contact" },
  ],
  skillGroups: [
    {
      area: "Frontend",
      items: [
        "Next.js (App Router, dynamic & nested routes, route groups, layouts)",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "ShadCN UI",
        "React Query (useQuery / useMutation)",
        "React Hook Form + Zod",
      ],
    },
    {
      area: "Backend",
      items: [
        "Node.js",
        "Express.js (routing & middleware)",
        "MongoDB + Mongoose",
        "REST APIs",
        "JWT Authentication",
        "Socket.IO",
      ],
    },
    {
      area: "AI",
      items: ["AI Integration", "Prompt Engineering", "AI Automation"],
    },
    {
      area: "Deployment & Tools",
      items: ["Vercel", "Render / Railway", "AWS (EC2, S3)", "Git & GitHub"],
    },
  ],
  certificates: [
    {
      title: "Artificial Intelligence using Prolog",
      issuer: "SWAYAM · IGNOU / CSVTU",
      date: "Dec 2024",
      image: "/certificates/swayam-ai-prolog.jpg",
    },
    {
      title: "Data Structures using C",
      issuer: "SWAYAM · IGNOU / CSVTU",
      date: "Dec 2024",
      image: "/certificates/swayam-data-structures-c.jpg",
    },
    {
      title: "NCC 'A' Certificate",
      issuer: "National Cadet Corps · Naval Unit, Karnataka",
      date: "2018",
      image: "/certificates/ncc-a-certificate.jpg",
    },
  ],
  cvPath: "/Sagar-B-J-Resume.pdf",
};
