# Executar com Docker e publicar

O Docker Compose inicia três serviços separados: frontend Next.js, API ASP.NET
Core e banco PostgreSQL. Só o frontend publica uma porta. A API e o banco ficam
na rede interna do Compose.

## Execução local

```bash
docker compose up --build -d
docker compose ps
```

Abra `http://localhost:3000`. A API aplica suas migrações ao iniciar e responde
saudável apenas quando consegue acessar o banco. Use `docker compose logs -f`
para acompanhar os serviços.

## Configurar domínio e senha

Copie `.env.example` para `.env`, informe o domínio real em
`NEXT_PUBLIC_SITE_URL` e defina uma senha forte em `POSTGRES_PASSWORD`. Essas
configurações não devem conter segredos publicados no GitHub. Depois reconstrua:

```bash
docker compose up --build -d
```

No servidor, configure DNS e HTTPS com um proxy reverso para o frontend na
porta `3000`. Mantenha a API e o PostgreSQL sem portas públicas.

## Dados e atualização

O banco usa o volume `portfolio_data`. `docker compose down` mantém seus
projetos; `docker compose down -v` apaga também os dados e deve ser tratado como
uma exclusão. Para backups, use `pg_dump` dentro do container PostgreSQL.

Quando editar o frontend ou os Dockerfiles, monte a nova imagem com
`docker compose up --build -d`. Ao atualizar os dados de um projeto, altere a
tabela PostgreSQL; não é preciso reconstruir imagens.
