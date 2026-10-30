"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import Lenis from "lenis";

type Fn = () => void;

const VS =
  "varying vec3 vN;varying float vD;uniform float uT;float n(vec3 p){return sin(p.x*1.7+uT)*sin(p.y*1.9-uT*.8)*sin(p.z*1.5+uT*.6);}void main(){float d=n(position*1.1)*.34+n(position*2.3+3.)*.14;vD=d;vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position+normal*d,1.);}";
const FS =
  "varying vec3 vN;varying float vD;uniform vec3 c1,c2,c3;void main(){float f=pow(1.-abs(normalize(vN).z),2.2);vec3 c=mix(c1,c2,smoothstep(-.35,.25,vD));c=mix(c,c3,smoothstep(.05,.45,vD));gl_FragColor=vec4(c*(.6+f*.8),1.);}";

/**
 * Animações e efeitos da página: esfera WebGL (Three.js), rolagem suave (Lenis),
 * transições ao rolar (GSAP + ScrollTrigger), cursor e troca de paleta.
 * Tudo é limpo quando o componente desmonta.
 */
export default function Effects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const D = document;
    const root = D.documentElement;
    const $ = (s: string, c: ParentNode = D) => Array.from(c.querySelectorAll<HTMLElement>(s));
    const R = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const T = matchMedia("(hover:hover)").matches;
    const off: Fn[] = [];
    const on = (t: EventTarget, e: string, f: EventListener, o?: AddEventListenerOptions) => {
      t.addEventListener(e, f, o);
      off.push(() => t.removeEventListener(e, f, o));
    };
    const pre = D.getElementById("pre");
    const pn = D.getElementById("pn");
    const hide = () => {
      if (pre) pre.style.display = "none";
    };
    const hex = (n: string) => getComputedStyle(root).getPropertyValue(n).trim();
    let onPal: Fn = () => {};
    let L: Lenis | null = null;

    const failsafe = setTimeout(hide, 7000);
    off.push(() => clearTimeout(failsafe));

    /* paleta de cores (desktop) */
    const pals = $(".pal button");
    pals.forEach((b) =>
      on(b, "click", () => {
        root.dataset.p = b.dataset.p;
        pals.forEach((x) => x.classList.toggle("on", x === b));
        onPal();
      })
    );

    /* esfera WebGL */
    const cv = D.getElementById("gl") as HTMLCanvasElement | null;
    if (cv) {
      try {
        const lite =
          innerWidth < 800 || matchMedia("(pointer:coarse)").matches || (navigator.hardwareConcurrency || 8) <= 4;
        const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: "high-performance" });
        r.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 800 ? 2 : lite ? 1.25 : 1.75));
        const sc = new THREE.Scene();
        const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        cam.position.z = 6;
        const cols = [new THREE.Color(), new THREE.Color(), new THREE.Color()];
        const U = { uT: { value: 0 }, c1: { value: cols[0] }, c2: { value: cols[1] }, c3: { value: cols[2] } };
        const setC = (anim: boolean) =>
          ["--g1", "--g2", "--g3"].forEach((v, i) => {
            const c = new THREE.Color(hex(v));
            if (anim) gsap.to(cols[i], { r: c.r, g: c.g, b: c.b, duration: 0.9 });
            else cols[i].copy(c);
          });
        setC(false);
        onPal = () => setC(true);

        const g = new THREE.Group();
        sc.add(g);
        const seg = lite ? 56 : 96;
        const sg = new THREE.SphereGeometry(1.6, seg, seg);
        const sm = new THREE.ShaderMaterial({ uniforms: U, vertexShader: VS, fragmentShader: FS });
        g.add(new THREE.Mesh(sg, sm));

        const N = lite ? 250 : 700;
        const pa = new Float32Array(N * 3);
        for (let i = 0; i < N * 3; i++) pa[i] = (Math.random() - 0.5) * 14;
        const pg = new THREE.BufferGeometry();
        pg.setAttribute("position", new THREE.BufferAttribute(pa, 3));
        const pm = new THREE.PointsMaterial({ size: 0.025, color: 0xffffff, transparent: true, opacity: 0.5 });
        const pts = new THREE.Points(pg, pm);
        sc.add(pts);

        const rs = () => {
          const w = cv.clientWidth;
          const h = cv.clientHeight;
          const d = w > 800;
          r.setSize(w, h, false);
          cam.aspect = w / h;
          cam.updateProjectionMatrix();
          g.position.set(d ? 2.3 : 0.55, d ? 0 : 1.75, 0);
          g.scale.setScalar(d ? 1 : 0.6);
        };
        rs();
        on(window, "resize", rs);

        let mx = 0;
        let my = 0;
        let vis = true;
        let fr = 0;
        let raf = 0;
        on(
          window,
          "pointermove",
          (e) => {
            const p = e as PointerEvent;
            mx = p.clientX / innerWidth - 0.5;
            my = p.clientY / innerHeight - 0.5;
          },
          { passive: true }
        );
        const io = new IntersectionObserver((e) => {
          vis = e[0].isIntersecting;
        });
        io.observe(cv);
        const ck = new THREE.Clock();
        const loop = () => {
          raf = requestAnimationFrame(loop);
          if (!vis || D.hidden || (lite && fr++ & 1)) return;
          const t = ck.getElapsedTime();
          U.uT.value = R ? 1 : t * 0.6;
          g.rotation.y += (mx * 0.9 - g.rotation.y) * 0.05;
          g.rotation.x += (my * 0.6 - g.rotation.x) * 0.05;
          pts.rotation.y = R ? 0 : t * 0.02;
          r.render(sc, cam);
        };
        loop();
        off.push(() => {
          cancelAnimationFrame(raf);
          io.disconnect();
          r.dispose();
          sg.dispose();
          sm.dispose();
          pg.dispose();
          pm.dispose();
        });
      } catch {
        /* sem WebGL: o fundo continua funcionando só com CSS */
      }
    }

    /* cursor personalizado */
    const cur = D.getElementById("cur");
    if (T && cur) {
      let cx = 0;
      let cy = 0;
      let tx = 0;
      let ty = 0;
      let raf = 0;
      on(
        window,
        "pointermove",
        (e) => {
          const p = e as PointerEvent;
          tx = p.clientX;
          ty = p.clientY;
        },
        { passive: true }
      );
      const f = () => {
        cx += (tx - cx) * 0.2;
        cy += (ty - cy) * 0.2;
        cur.style.transform = `translate(${cx}px,${cy}px)`;
        raf = requestAnimationFrame(f);
      };
      f();
      off.push(() => cancelAnimationFrame(raf));
      $("a,button").forEach((el) => {
        on(el, "mouseenter", () => cur.classList.add("big"));
        on(el, "mouseleave", () => cur.classList.remove("big"));
      });
    }

    /* brilho que acompanha o mouse nos cartões */
    $(".pj").forEach((p) =>
      on(p, "pointermove", (e) => {
        const m = e as PointerEvent;
        const b = p.getBoundingClientRect();
        const v = p.querySelector<HTMLElement>(".vis");
        if (!v) return;
        v.style.setProperty("--dx", ((m.clientX - b.left) / b.width - 0.5) * 80 + "px");
        v.style.setProperty("--dy", ((m.clientY - b.top) / b.height - 0.5) * 60 + "px");
      })
    );

    /* links internos (rolagem suave) */
    $('a[href^="#"]').forEach((a) =>
      on(a, "click", (e) => {
        const t = a.getAttribute("href") ? D.querySelector<HTMLElement>(a.getAttribute("href") as string) : null;
        if (!t) return;
        e.preventDefault();
        if (L) L.scrollTo(t);
        else t.scrollIntoView({ behavior: "smooth" });
      })
    );

    /* animações de rolagem */
    if (R) {
      hide();
    } else {
      if (T) {
        L = new Lenis({ lerp: 0.09 });
        L.on("scroll", () => ScrollTrigger.update());
        const tick = (t: number) => L?.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        off.push(() => {
          gsap.ticker.remove(tick);
          L?.destroy();
          L = null;
        });
      }

      const mm = gsap.matchMedia();
      const ctx = gsap.context(() => {
        gsap.set(".w", { opacity: 0.2 });

        let seen = false;
        try {
          seen = sessionStorage.getItem("vt") === "1";
          sessionStorage.setItem("vt", "1");
        } catch {
          /* sem sessionStorage */
        }
        const intro = (d: number) => {
          gsap.from(".hero .ln>span", { yPercent: 115, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: d });
          gsap.from(".hero .fi", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: d + 0.25 });
          gsap.from("#hd", { y: -30, opacity: 0, duration: 0.8, delay: d + 0.1 });
        };
        if (seen) {
          hide();
          intro(0);
        } else {
          const o = { v: 0 };
          gsap.to(o, {
            v: 100,
            duration: 0.9,
            ease: "power2.inOut",
            onUpdate: () => {
              if (pn) pn.textContent = String(Math.round(o.v));
            },
            onComplete: () => {
              gsap.to(pre, { yPercent: -100, duration: 0.7, ease: "expo.inOut", onComplete: hide });
              intro(0.25);
            },
          });
        }

        gsap.to(".hc", {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("#pg", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });
        $(".rv").forEach((el) =>
          gsap.from(el, { y: 50, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } })
        );
        $(".tx p").forEach((p) =>
          gsap.to($(".w", p), {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: p, start: "top 82%", end: "bottom 58%", scrub: true },
          })
        );
        gsap.from(".pt", {
          clipPath: "inset(100% 0 0 0 round 28px)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: ".pt", start: "top 82%" },
        });
        gsap.to(".pt img", { yPercent: -9, ease: "none", scrollTrigger: { trigger: ".pt", scrub: true } });

        mm.add("(min-width:900px)", () => {
          const tr = D.querySelector<HTMLElement>(".track");
          if (!tr) return;
          gsap.to(tr, {
            x: () => -(tr.scrollWidth - innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: ".pin",
              pin: true,
              scrub: 0.8,
              end: () => "+=" + (tr.scrollWidth - innerWidth),
              invalidateOnRefresh: true,
            },
          });
        });
        mm.add("(max-width:899px)", () => {
          $(".pj").forEach((p) =>
            gsap.from(p, { y: 60, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 88%" } })
          );
        });
      });
      off.push(() => {
        mm.revert();
        ctx.revert();
      });

      const refresh = () => ScrollTrigger.refresh();
      on(window, "load", refresh);
      D.fonts?.ready.then(refresh);
    }

    return () => {
      off.reverse().forEach((f) => f());
    };
  }, []);

  return null;
}