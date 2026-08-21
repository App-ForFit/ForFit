# PROJETO 4

**Pequenas escolhas. Grandes mudanças.**

PWA de acompanhamento de hábitos, evolução e motivação, construída com React + Vite + TypeScript. Os dados ficam salvos no `localStorage` do navegador — não há backend nesta versão, mas a estrutura (contexto único + tipos separados) foi pensada para depois trocar essa camada por uma API real sem reescrever as telas.

## Como rodar

Pré-requisitos: Node.js 18+ instalado.

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
npm run preview
```

O comando `build` gera a pasta `dist/`, pronta para publicar em qualquer hospedagem estática (Vercel, Netlify, etc.).

## Instalar como app (PWA)

Depois de rodar `npm run build && npm run preview` (ou publicar o `dist/`), abra o endereço no Chrome/Edge (desktop ou Android) e use "Instalar aplicativo"; no Safari iOS, use "Adicionar à Tela de Início". O app funciona offline para as telas e dados já carregados, graças ao service worker em `public/sw.js`.

## O que já funciona

- Cadastro, Marco Zero e Objetivos alimentam o perfil do usuário.
- Tela Início mostra o resumo do dia (água, alimentação, movimento, sono) com progresso real.
- "Registrar" permite lançar água, alimentação, movimento, sono, peso e humor — tudo persiste e atualiza a Início na hora.
- Evolução calcula a diferença de peso e medidas a partir dos dados reais e desenha o gráfico com Recharts.
- Grupo mostra ranking por consistência (nunca por peso), com dados de demonstração.
- Desafios, Lista de compras e Conquistas são interativos (marcar itens, avançar desafios).
- Todo o estado é salvo automaticamente no `localStorage` (chave `projeto4:state:v1`).
- Em Perfil → Sair, é possível apagar os dados de demonstração e recomeçar do zero.

## Estrutura

```
src/
  components/   Button, Card, ProgressBar, BottomNav, Badge, Avatar...
  pages/        uma tela do app por arquivo (15 telas do briefing)
  context/      AppContext.tsx — estado global + regras + persistência
  data/         dados de demonstração (usuária "Tamires")
  types/        interfaces TypeScript (Profile, DayLog, Challenge...)
```

## Próximos passos sugeridos

- Trocar `localStorage` por uma API + banco de dados real.
- Autenticação de verdade (hoje o cadastro só salva o perfil localmente).
- Grupos reais com convite/entrada de outros usuários.
- Notificações push para lembretes de hábitos.
- Painel administrativo.
