# O Docker é uma camada de abstração semelhante  a uma máquina virtual (VM)
# contudo, ela compartilha recursos do sistema operacional hospedeiro, o que o torna
# mais leve e rápido que uma VM tradicional.

# Aqui estamos utilizando o recurso de multi-stage builds do Docker.
# A ideia, é que o docker não é redundante, ele trabalha com um aspecto chamado
# idempotência. Ou seja, cada comando no Dockerfile cria uma nova camada (layer)
# de imagem, e essas camadas são reutilizadas em builds futuros.

# Quando há o "build" desse Dockerfile, todas as camadas são criadas e empilhadas
# para formar a imagem final. Contudo, quando a imagem é executada, todas as camadas
# permanecem na imagem, mesmo que algumas delas não sejam necessárias para a execução
# da aplicação. Ainda sim, um estágio que já foi concluído e não teve mais alteração
# em seus comandos, não será re-executado em builds futuros, economizando tempo.

# Estágio 1: Builder
# Aqui fazemos a transpilação (conversão de um código fonte para outro), das
# aplicações frontend (Aqui no caso, Vite + ReactJS + TypeScript) e backend
# (Aqui no caso, NestJS + TypeScript).
# O resultado disso (o que a gente chama de 'distribuição' ou 'build'/'production')
# é aquilo que vai rodar na imagem final, seja numa VPC, servidor dedicado, ou
# até mesmo na sua máquina local (Caso o Docker esteja instalado nela).

# Estágio 1: Builder
# Todo Dockerfile é iniciado a partir de uma imagem base.
# Aqui estamos utilizando a imagem oficial do Node.js, na sua versão 22 (LTS atual),
# baseada na imagem 'alpine', que é uma imagem minimalista, leve e segura.
# Apelidamos esse estágio de 'builder', para uso nos estágios seguintes.
FROM node:22-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Build Frontend
# Nas aplicações Node.js, é comum termos um arquivo package.json
# que lista as dependências do projeto.
# Aqui copiamos apenas esses arquivos primeiro, para aproveitar o cache;
# Depois instalamos as dependências com 'npm ci' (que é mais rápido e
# confiável para ambientes de produção).
# Depois copiamos o restante do código fonte e rodamos o build.
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm ci
COPY frontend/ .
RUN npm run build

# Build Backend
# Basicamente a mesma lógica do frontend.
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci
COPY backend/ .
RUN npm run build

# Estágio 2: Imagem Final de Produção
# Aqui usamos a imagem oficial do Debian, na sua versão 'stable-slim',
# que é uma imagem estável, leve e segura.
# Essa será a imagem final que rodará a aplicação.
# Então, quando rodarmos a imagem nexum:latest, estaremos rodando um container,
# simulando uma máquina virtual leve, com Debian instalado, Nginx, MariaDB,
# Node.js (para o backend) e todas as dependências necessárias.
# Detalhe, sem intervenção do usuário, tudo automatizado.
FROM debian:stable-slim

# Instala todas as dependências + gettext-base (para o envsubst)
RUN apt-get update && \
    apt-get install -y nginx mariadb-server nodejs npm supervisor gettext-base && \
    rm -rf /var/lib/apt/lists/*

# Copia os arquivos construídos do estágio 'builder'
# O ReactJS transpila pra um conjunto de arquivos estáticos (HTML, CSS, JS)
# que são servidos pelo Nginx.
# O NestJS transpila para arquivos JavaScript que serão executados pelo Node.js.
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY --from=builder /app/backend/dist /app/backend

# Copia o TEMPLATE do nginx e os outros arquivos de configuração
COPY ./nginx.conf.template /etc/nginx/nginx.conf.template
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh

# Dá permissão de execução para o script de entrada
# Esse script será responsável por inicializar o MariaDB. 
# (WIP) Embora a ideia seja usar migrations no NestJS.
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expõe a porta 80 do Nginx, que vai também rotear para o backend na porta definida.
EXPOSE 80

# Define o script de entrada e o comando padrão
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]