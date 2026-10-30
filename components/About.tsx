const paragraphs = [
  "Sou estudante de Ciência da Computação na UNINASSAU, com interesse em desenvolvimento de software, tecnologia e inovação. Busco transformar ideias em soluções práticas, eficientes e bem estruturadas.",
  "Valorizo a aprendizagem contínua, a resolução de problemas, a organização do código e soluções que priorizem qualidade, desempenho e facilidade de uso.",
  "Todos os projetos abaixo foram feitos por mim, do início ao fim.",
];

const facts = [
  ["UNINASSAU", "Ciência da Computação"],
  ["4º semestre", "Início em 2024, formatura prevista em 2027"],
  ["Maceió, AL", "Estudo de manhã, disponível à tarde"],
];

export default function About() {
  return (
    <section id="sobre">
      <div className="ab">
        <div className="pw">
          <div className="pt">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/foto-vinicius.jpg" alt="Foto de Vinícius Teles" />
          </div>
        </div>
        <div className="tx">
          <div className="k rv">01 — Sobre</div>
          <h2 className="big rv">
            Software é mais <span className="sf gt">que código.</span>
          </h2>
          {paragraphs.map((p) => (
            <p key={p}>
              {p.split(" ").map((w, i) => (
                <span className="w" key={i}>
                  {w}{" "}
                </span>
              ))}
            </p>
          ))}
          <div className="fc rv">
            {facts.map(([a, b]) => (
              <div key={a}>
                <b>{a}</b>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}