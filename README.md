# Portfólio — Vinícius Teles

Next.js (App Router) + TypeScript. Efeitos com Three.js (esfera WebGL), GSAP + ScrollTrigger (transições ao rolar) e Lenis (rolagem suave).

## Rodar no computador
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # confere se está tudo certo antes de publicar
```

## Onde editar o conteúdo
| O que mudar | Arquivo |
|---|---|
| Nome, e-mail, LinkedIn, GitHub, caminho do currículo | `data/site.ts` |
| Projetos (texto, "o que eu fiz", tecnologias, links, prints) | `data/projects.ts` |
| Texto do "Sobre" e os 3 dados rápidos | `components/About.tsx` |
| Stack, faixas de tecnologias e princípios | `components/Stack.tsx` |
| Cores, tamanhos e animações em CSS | `app/globals.css` |
| Esfera 3D, rolagem, cursor e transições | `components/Effects.tsx` |

Imagens ficam em `public/`. Para adicionar prints a um projeto, coloque o arquivo em `public/projetos/` e liste em `shots` no `data/projects.ts`.

## Antes de publicar (pendências)
1. **Nexus Academy:** confirmar a stack em `data/projects.ts` (há um comentário `CONFIRMAR`). O texto antigo citava Java/Spring Boot; o GitHub cita Django.
2. **Currículo:** substituir `public/curriculo-vinicius-teles.pdf` pela versão atualizada (a atual ainda lista o NutriAI).
3. **Nexus Academy sem prints:** hoje mostra só as iniciais "NA".
4. **FinTrack:** trocar o print do dashboard por um com dados de exemplo preenchidos.

## Publicar na Vercel
1. Suba a pasta para um repositório no GitHub (`.env` e `node_modules` já estão no `.gitignore`).
2. Na Vercel: *Add New → Project*, escolha o repositório. Não precisa de variável de ambiente nem configuração extra.
3. Publique só depois de conferir o site em `npm run build` + `npm start`.
