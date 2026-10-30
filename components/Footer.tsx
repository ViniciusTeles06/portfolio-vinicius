import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer>
      <span>© {new Date().getFullYear()} {site.name}</span>
      <span>Feito com Next.js, GSAP e Three.js</span>
    </footer>
  );
}