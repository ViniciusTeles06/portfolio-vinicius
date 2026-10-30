import { site } from "@/data/site";

export default function Contact() {
  return (
    <section id="contato">
      <div className="k rv">04 — Contato</div>
      <h2 className="mega rv">
        Vamos construir algo <span className="sf gt">notável?</span>
      </h2>
      <p className="sub rv">
        Estou disponível para estágio e vaga júnior, e aberto a colaborações com quem gosta de tecnologia.
      </p>
      <a className="mail rv" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <div className="cta rv">
        <a className="bt" href={site.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <a className="bt" href={site.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </div>
    </section>
  );
}