# Backend .NET

A API ASP.NET Core expõe `GET /api/v1/projects` e `GET /health`. A lista vem do
PostgreSQL; o arquivo JSON deixou de ser uma fonte de dados. A conexão fica na
configuração `ConnectionStrings:Portfolio`, fornecida pelo Docker Compose.

## Camadas

- `Portfolio.Domain`: projeto e regras centrais, sem dependência de banco ou HTTP.
- `Portfolio.Application`: caso de uso `ListProjects`, DTOs e contrato do repositório.
- `Portfolio.Infrastructure`: Entity Framework Core, PostgreSQL, repositório e migrações.
- `Portfolio.Api`: endpoints HTTP, injeção de dependências e aplicação das migrações.
- `Portfolio.Tests`: testes das regras e do caso de uso.

As dependências apontam para dentro: a API conhece Infrastructure; Infrastructure
conhece Application; Application conhece Domain. Domain não conhece as outras
camadas. A API não oferece comandos públicos para alterar projetos.

## Banco de dados

Ao iniciar, a API aplica as migrações EF Core. A migração inicial cria a tabela
`projects` e inclui Reelvio e Florae. O Compose guarda os dados no volume
`portfolio_data`, que sobrevive a reinícios comuns.

Para adicionar uma migração depois de alterar o modelo, na pasta `backend`:

```bash
$env:ConnectionStrings__Portfolio = "Host=localhost;Port=5432;Database=portfolio;Username=portfolio;Password=SUA_SENHA"
dotnet ef migrations add NomeDaMigracao --project Portfolio.Infrastructure --startup-project Portfolio.Api
```

Essa operação exige acesso ao NuGet e ao PostgreSQL local. Não é necessária para
apenas adicionar uma linha à tabela existente.
