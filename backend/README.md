# API .NET

API em .NET 10 que fornece a lista de projetos do portfólio em
`GET /api/v1/projects`. Os dados editáveis ficam em
`Portfolio.Api/data/projects.json`.

`GET /health` responde se o serviço está funcionando. No Docker, a API fica na
rede interna entre containers; o Next.js encaminha os pedidos do navegador.

Para rodar sem Docker, na pasta `backend/Portfolio.Api` execute:

```bash
dotnet run --urls http://localhost:5080
```

Depois acesse `http://localhost:5080/health`.
