import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";

export default function Home() {
  return (
    <>
      <div id="pre">
        <div className="pc">
          <span id="pn">0</span>%
        </div>
        <p>Vinícius Teles · Portfólio</p>
      </div>
      <div id="cur" />
      <div id="pg" />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Effects />
    </>
  );
}