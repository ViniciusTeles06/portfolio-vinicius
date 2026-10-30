export type Project = {
  id: string;
  n: string;
  title: string;
  status: "done" | "wip";
  statusLabel: string;
  desc: string;
  role: string;
  tags: string[];
  links: { label: string; href: string }[];
  shots: { src: string; alt: string }[];
  initials: string;
};

export const projects: Project[] = [
  {
    id: "fintrack",
    n: "01",
    title: "FinTrack",
    status: "done",
    statusLabel: "Pronto · Projeto final UNINASSAU",
    desc: "Aplicação web de finanças pessoais com login, dashboard de receitas e despesas, transações, metas, categorias e modo claro e escuro.",
    role: "Projeto individual, do design ao deploy: telas de login e cadastro, dashboard com gráficos, transações, metas, categorias e modo claro e escuro.",
    tags: ["React", "Vite", "Framer Motion", "Context API"],
    links: [
      { label: "Ver demo ↗", href: "https://fintrack-nine-virid.vercel.app/" },
      { label: "Código ↗", href: "https://github.com/ViniciusTeles06/fintrack" },
    ],
    shots: [
      { src: "/projetos/fintrack-dashboard.jpg", alt: "Dashboard do FinTrack com receitas, despesas e saldo" },
      { src: "/projetos/fintrack-login.jpg", alt: "Tela de login do FinTrack" },
    ],
    initials: "FT",
  },
  {
    id: "nexus-academy",
    n: "02",
    title: "Nexus Academy",
    status: "wip",
    statusLabel: "Em desenvolvimento",
    desc: "Plataforma acadêmica para centralizar o gerenciamento de alunos, professores, turmas e disciplinas.",
    role: "Projeto individual: desenvolvi o back-end, o front-end e a publicação, e continuo evoluindo a plataforma.",
    // CONFIRMAR: o texto "Sobre mim" antigo citava Java/Spring Boot; o GitHub cita Django. Ajuste aqui.
    tags: ["Django", "Next.js", "PostgreSQL", "TypeScript"],
    links: [
      { label: "Ver aplicação ↗", href: "https://nexus-academy-woad.vercel.app/" },
      { label: "Código ↗", href: "https://github.com/ViniciusTeles06/nexus-academy" },
    ],
    shots: [], // adicionar prints em public/projetos/ e listar aqui
    initials: "NA",
  },
  {
    id: "isabelle-tenorio",
    n: "03",
    title: "Isabelle Tenório",
    status: "done",
    statusLabel: "No ar",
    desc: "Site institucional e de encomendas de uma marca de moda autoral feita à mão, em Maceió. Apresenta as criações e a história da marca, e tem um formulário em 3 etapas que monta o pedido para enviar pelo WhatsApp.",
    role: "Projeto individual, do design à publicação: as páginas do site e o formulário de encomenda em 3 etapas.",
    tags: ["Marca real", "Formulário → WhatsApp"],
    links: [
      { label: "Ver site ↗", href: "https://isabelle-tenorio.vercel.app/" },
      { label: "Instagram da marca ↗", href: "https://www.instagram.com/isabelletenorio.br/" },
    ],
    shots: [
      { src: "/projetos/isabelle-home.jpg", alt: "Página inicial do site Isabelle Tenório" },
      { src: "/projetos/isabelle-criacoes.jpg", alt: "Seção de criações do site Isabelle Tenório" },
      { src: "/projetos/isabelle-encomenda.jpg", alt: "Formulário de encomenda em etapas do site Isabelle Tenório" },
    ],
    initials: "IT",
  },
];