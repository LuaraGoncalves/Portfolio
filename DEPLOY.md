# Docker e deploy

O Docker Compose inicia duas caixinhas: o site Next.js e a API .NET. Só o site
abre a porta `3000` no computador. A API fica numa rede interna entre as duas.

## Rodar no computador

```bash
docker compose up --build -d
docker compose ps
```

Abra `http://localhost:3000`. O Compose espera a API ficar pronta, verifica os
dois serviços e reinicia um container se ele parar. Para acompanhar os registros use
`docker compose logs -f`; para parar use `docker compose down`.

## Usar o domínio publicado

O endereço público entra no HTML durante a montagem da imagem. Crie um arquivo
`.env` a partir de `.env.example`, coloque seu domínio em
`NEXT_PUBLIC_SITE_URL` e monte a imagem de novo:

```bash
docker compose up --build -d
```

Em um servidor, configure o DNS do domínio e um proxy HTTPS para encaminhar as
requisições à porta `3000`. A API continua privada na rede do Docker.

## Parar e atualizar

```bash
docker compose down
docker compose up --build -d
```

Os dois `Dockerfile`s usam etapas separadas: instalam os pacotes, montam o site
e a API e guardam nas imagens finais os arquivos necessários para executá-los.
