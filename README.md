# Portfólio .NET + Next.js

O projeto tem duas partes: a página do portfólio em Next.js e uma API em
ASP.NET Core que fornece a lista de projetos.

## Como as pastas se organizam

```text
app/, components/, lib/, public/  -> página (Next.js / frontend)
backend/Portfolio.Api/            -> API (ASP.NET Core / .NET 10)
docker-compose.yml                -> liga os dois serviços
```

## Rodar com Docker

Instale o Docker Desktop e abra o terminal nesta pasta. Depois rode:

```bash
docker compose up --build -d
```

Abra `http://localhost:3000` no navegador. Para parar o site:

```bash
docker compose down
```

O primeiro comando monta as duas caixinhas (imagens) e inicia os serviços. A
página pede a lista de projetos à API .NET. Nas próximas vezes, basta rodar
`docker compose up -d`.

## Conferir a imagem

```bash
docker compose build
```

Esse comando pede ao Docker para instalar as dependências e compilar a página e a API.

## Personalizar

- Nome, links, e-mail e currículo: `lib/portfolio.ts` (`profile`)
- Projetos reais: `backend/Portfolio.Api/data/projects.json`
- Imagens dos projetos: `public/projects`
- URL pública: `.env` (copie `.env.example` e coloque seu domínio)
- Currículo: coloque seu PDF em `public` e atualize `profile.resumeUrl`

Links e informações não fornecidos ficam ocultos no site. A API começa com uma
lista de projetos vazia para evitar mostrar exemplos como se fossem reais.

## Docker em produção

Consulte [DEPLOY.md](DEPLOY.md) para publicar a imagem Docker em um servidor.

## Checklist antes de publicar

- Confirmar o nome exibido em `lib/portfolio.ts`.
- Adicionar e-mail, GitHub e LinkedIn em `lib/portfolio.ts`.
- Adicionar projetos reais em `backend/Portfolio.Api/data/projects.json` e conferir os links.
- Adicionar o PDF real do currículo e atualizar `profile.resumeUrl`.
- Definir `NEXT_PUBLIC_SITE_URL` com o domínio publicado.
