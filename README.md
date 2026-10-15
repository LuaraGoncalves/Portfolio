# Portfólio profissional — Next.js, .NET e PostgreSQL

O site apresenta os projetos e o perfil profissional. A interface é feita com
Next.js e React; os projetos são lidos no servidor e vêm de uma API ASP.NET
Core. Essa API consulta o PostgreSQL usando Entity Framework Core.

## Organização

```text
app/                         rotas, metadados e renderização do Next.js
components/                  cabeçalho, apresentação, projetos, contato e rodapé
lib/                         perfil, filtros e chamada servidor-servidor da API
public/projects/              imagens e capturas reais dos projetos
backend/Portfolio.Domain/     entidades e regras centrais
backend/Portfolio.Application/ casos de uso e contratos do banco
backend/Portfolio.Infrastructure/ PostgreSQL, EF Core e migrações
backend/Portfolio.Api/        endpoints HTTP e inicialização do banco
backend/Portfolio.Tests/      testes do domínio e dos casos de uso
docker-compose.yml            frontend, API .NET e PostgreSQL
```

O caminho dos dados é: página Next.js no servidor → API .NET → camada de
aplicação → domínio e repositório → PostgreSQL. O navegador já recebe os
projetos junto com a primeira resposta da página; os botões de filtro continuam
interativos.

## Rodar tudo com Docker

1. Instale e abra o Docker Desktop.
2. Na pasta do projeto, execute:

```bash
docker compose up --build -d
```

3. Abra [http://localhost:3000](http://localhost:3000).
4. Veja se os três serviços estão prontos:

```bash
docker compose ps
```

O primeiro início cria o banco, aplica a migração e cadastra Reelvio e Florae.
O volume `portfolio_data` conserva seus registros quando os containers são
recriados. `docker compose down` para os serviços sem apagar esse volume.

## Alterar ou adicionar um projeto

A API pública oferece somente leitura. Assim ninguém consegue editar os
projetos pela internet sem autorização. Para alterar os dados, abra o terminal
no container do banco:

```bash
docker compose exec database psql -U portfolio -d portfolio
```

A tabela `projects` guarda os campos `Title`, `Image`, `Description`,
`Technologies`, `GithubUrl`, `DemoUrl`, `Status`, `ImagePosition`, `Screenshots`
e `DemoVideoUrl`. Exemplo de novo cadastro (troque cada valor pelo conteúdo
real do seu projeto):

```sql
INSERT INTO projects
  ("Id", "Title", "Image", "Description", "Technologies", "GithubUrl",
   "DemoUrl", "Status", "ImagePosition", "Screenshots", "DemoVideoUrl")
VALUES
  (gen_random_uuid(), 'Nome do projeto', '/projects/capa.png', 'Descrição real',
   ARRAY['React', 'TypeScript'], 'https://github.com/SEU-USUARIO/REPOSITORIO',
   NULL, 'Concluído', NULL,
   ARRAY['/projects/tela-1.png', '/projects/tela-2.png'], NULL);
```

Coloque as imagens em `public/projects/`; no banco, informe o endereço começando
com `/projects/`. O vídeo pode ser um endereço do YouTube ou Vimeo. Para editar,
use `UPDATE projects SET ... WHERE "Id" = 'ID-DO-PROJETO';`. Para sair do banco,
digite `\q`. Não existe painel administrativo; mantenha o acesso ao banco
restrito.

## Testes e verificações

```bash
npm run lint
npm run typecheck
npm test
dotnet test backend/Portfolio.Tests/Portfolio.Tests.csproj
dotnet build backend/Portfolio.Api/Portfolio.Api.csproj
docker compose config --quiet
```

O GitHub Actions executa esses testes e compila o frontend e o backend ao abrir
um push ou pull request.

## Perfil, currículo e domínio

- E-mail, nome exibido, links e caminhos pessoais ficam em `lib/portfolio.ts`.
- Para mostrar a foto, coloque seu arquivo em `public/foto-perfil.jpg` e ajuste
  `profile.photoUrl` para `/foto-perfil.jpg`.
- Para mostrar o currículo, coloque o PDF em `public/curriculo.pdf` e ajuste
  `profile.resumeUrl` para `/curriculo.pdf`.
- O nome está como “Luara” até você confirmar o nome profissional completo.
- Antes de publicar em um domínio, copie `.env.example` para `.env`, preencha
  `NEXT_PUBLIC_SITE_URL` com o endereço real e escolha uma senha forte para o
  banco. Depois gere as imagens novamente com `docker compose up --build -d`.

O site gera uma imagem de prévia para compartilhamento. O domínio real é
necessário para formar links canônicos e um sitemap completo.

## Parar

```bash
docker compose down
```

Para apagar também o banco e todos os projetos salvos, o comando é
`docker compose down -v`. Esse comando apaga os dados do volume; não o use se
quiser manter o banco.

Veja [DEPLOY.md](DEPLOY.md) para a publicação em servidor.
