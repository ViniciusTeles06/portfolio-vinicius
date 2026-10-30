const row1 = ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind", "Vite", "Framer Motion", "Node.js", "Express", "Python", "Django", "PostgreSQL", "Prisma"];
const row2 = ["REST APIs", "Serverless", "React Native", "Expo", "Git", "GitHub", "Vercel", "Figma", "GSAP", "Three.js", "WebGL"];

const groups = [
  ["Front-end", "React, Next.js, TypeScript, JavaScript, Tailwind, Vite, Framer Motion, HTML e CSS"],
  ["Back-end e dados", "Node.js, Express, Python, Django, REST APIs, funções serverless, PostgreSQL e Prisma"],
  ["Mobile e ferramentas", "React Native, Expo, Git, GitHub, Vercel e Figma"],
  ["Explorando agora", "GSAP, Three.js, WebGL, TypeScript avançado, Next.js App Router e testes unitários"],
];

const principles = [
  ["01", "Estrutura", "Responsabilidades claras, código organizado e soluções que possam evoluir."],
  ["02", "Experiência", "Interfaces intuitivas, consistentes e projetadas para pessoas reais."],
  ["03", "Evolução", "Experimentação, aprendizado e evolução constante das soluções."],
];

const Marquee = ({ items, rev }: { items: string[]; rev?: boolean }) => (
  <div className={`mq${rev ? " rev" : ""}`} aria-hidden="true">
    <div className="tr">
      {[...items, ...items].map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  </div>
);

export default function Stack() {
  return (
    <section id="stack">
      <div className="k rv">03 — Stack</div>
      <h2 className="big rv">
        Ferramentas do <span className="sf gt">ofício</span>
      </h2>
      <Marquee items={row1} />
      <Marquee items={row2} rev />
      <div className="sg rv">
        {groups.map(([h, p]) => (
          <div key={h}>
            <h4>{h}</h4>
            <p>{p}</p>
          </div>
        ))}
      </div>
      <div className="pr rv">
        {principles.map(([n, h, p]) => (
          <div key={n}>
            <span>{n}</span>
            <h3>{h}</h3>
            <p>{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}