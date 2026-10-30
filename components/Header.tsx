import { site } from "@/data/site";

const palettes: [string, string, string][] = [
  ["aurora", "Aurora", "#7c5cff,#ff5ca8,#ffb86b"],
  ["oceano", "Oceano", "#2dd4bf,#38bdf8,#818cf8"],
  ["brasa", "Brasa", "#ffc371,#ff6b4a,#d6338a"],
  ["grafite", "Grafite", "#fff,#c4c4cc,#6f6f7a"],
];

export default function Header() {
  return (
    <header id="hd">
      <a className="lg" href="#top">
        VT<i />
      </a>
      <nav>
        <a href="#sobre">Sobre</a>
        <a href="#projetos">Projetos</a>
        <a href="#stack">Stack</a>
        <a href="#contato">Contato</a>
      </nav>
      <div className="hr">
        <a className="cvb" href={site.cv} download data-cv>
          Currículo ↓
        </a>
        <div className="pal" role="group" aria-label="Paleta de cores">
          {palettes.map(([id, name, c]) => (
            <button
              key={id}
              data-p={id}
              className={id === "grafite" ? "on" : undefined}
              aria-label={`Paleta ${name}`}
              style={{ background: `linear-gradient(135deg,${c})` }}
            />
          ))}
        </div>
      </div>
    </header>
  );
}