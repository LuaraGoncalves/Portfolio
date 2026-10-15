import {
  BadgeCheck,
  BookOpenCheck,
  Boxes,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
  TestTube2
} from "lucide-react";

export const profile = {
  name: "Luara",
  fullName: "Luara",
  role: "Desenvolvedora Back-End .NET",
  photoUrl: "/foto-perfil.jpg",
  email: "luara.goncalvesrocha@outlook.com",
  location: "Brasil",
  githubUrl: "https://github.com/LuaraGoncalves",
  linkedinUrl: "https://www.linkedin.com/in/luaradev/",
  whatsappNumber: "+55 18 99632-4393",
  resumeUrl: null as string | null
};

export const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Projetos", href: "#projetos" },
  { label: "Formação", href: "#formacao" },
  { label: "Contato", href: "#contato" }
];

export const skillGroups = [
  {
    title: "Backend",
    icon: ServerCog,
    items: ["C#", ".NET", "ASP.NET Core", "Java", "Spring Boot", "Python", "Node.js"]
  },
  {
    title: "Frontend",
    icon: Code2,
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS"
    ]
  },
  {
    title: "Banco de Dados",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "SQL Server"]
  },
  {
    title: "Ferramentas",
    icon: TerminalSquare,
    items: [
      "Docker",
      "Git",
      "GitHub",
      "Postman",
      "Swagger",
      "Entity Framework",
      "Prisma"
    ]
  }
];

export type PortfolioProject = {
  id: string;
  title: string;
  image: string;
  imagePosition?: string | null;
  description: string;
  techs: string[];
  githubUrl: string;
  demoUrl: string | null;
  status: string;
  screenshots: string[];
  demoVideoUrl: string | null;
};

export const architecturePractices = [
  { label: "Clean Architecture", icon: Layers3 },
  { label: "SOLID", icon: ShieldCheck },
  { label: "Injeção de Dependência", icon: Boxes },
  { label: "APIs REST", icon: ServerCog },
  { label: "Entity Framework", icon: Database },
  { label: "Docker", icon: Boxes },
  { label: "Autenticação com JWT", icon: ShieldCheck },
  { label: "Testes unitários", icon: TestTube2 },
  { label: "CI/CD", icon: BadgeCheck }
];

export const stats = [
  { value: "C# / .NET", label: "Foco principal" },
  { value: "APIs REST", label: "Desenvolvimento back-end" },
  { value: "SQL", label: "Dados relacionais" },
  { value: "React / Vue", label: "Interfaces web" }
];

export const timeline = [
  {
    title: "Análise e Desenvolvimento de Sistemas",
    subtitle: "Formação acadêmica",
    icon: GraduationCap,
    description:
      "Estudos voltados a desenvolvimento de software, banco de dados, arquitetura, lógica e boas práticas."
  },
  {
    title: "Aprendizado contínuo",
    subtitle: "Aprimoramento",
    icon: BookOpenCheck,
    description:
      "Prática contínua de programação e aprofundamento em ferramentas usadas no desenvolvimento de software."
  }
];
