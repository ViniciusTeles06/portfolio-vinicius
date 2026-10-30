import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projetos">
      <div className="pin">
        <div className="ph0">
          <div className="k rv">02 — Projetos</div>
          <h2 className="big rv">
            Trabalhos <span className="sf gt">selecionados</span>
          </h2>
        </div>
        <div className="track">
          {projects.map((p) => (
            <article className="pj" key={p.id}>
              <div className="in">
                <div className="top">
                  <span>{p.n}</span>
                  <em className={`st ${p.status === "done" ? "ok" : "wip"}`}>{p.statusLabel}</em>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <p className="me">
                  <b>O que eu fiz</b>
                  {p.role}
                </p>
                <div className="chips">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="lk">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="vis">
                {p.shots.length ? (
                  <div className="fs">
                    {p.shots.map((s) => (
                      <figure className="fr" key={s.src}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.src} alt={s.alt} />
                      </figure>
                    ))}
                  </div>
                ) : (
                  <b>{p.initials}</b>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}