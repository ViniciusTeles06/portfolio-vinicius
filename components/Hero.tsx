import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <canvas id="gl" aria-hidden="true" />
      <div className="hc">
        <p className="nm fi">
          {site.name} · {site.city}
        </p>
        <p className="kick fi">
          <i />
          Disponível para estágio e vaga júnior
        </p>
        <h1>
          <span className="ln">
            <span>Desenvolvedor</span>
          </span>
          <span className="ln">
            <span>Full Stack</span>
          </span>
        </h1>
        <p className="lead fi">
          que transforma ideias em <em className="sf gt">experiências digitais</em>.
        </p>
        <p className="sub fi">
          Estudante de Ciência da Computação na UNINASSAU. Construo e publico aplicações web com{" "}
          <b>Next.js, TypeScript e Python</b>, do back-end à interface.
        </p>
        <div className="cta fi">
          <a className="bt p" href="#projetos">
            Ver projetos ↓
          </a>
          <a className="bt" href={site.cv} download data-cv>
            Baixar currículo ↓
          </a>
          <a className="bt" href="#contato">
            Falar comigo
          </a>
        </div>
      </div>
      <div className="scr fi k">Role para explorar</div>
    </section>
  );
}