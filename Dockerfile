# Estágio 1: Builder (igual ao seu, que é uma ótima prática)
FROM node:22-alpine AS builder
WORKDIR /app

# Build Frontend
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm ci
COPY frontend/ .
RUN npm run build

# Build Backend
WORKDIR /app
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci
COPY backend/ .
RUN npm run build

# Estágio 2: Imagem Final de Produção
FROM debian:stable-slim

# Instala todas as dependências + gettext-base (para o envsubst)
RUN apt-get update && \
    apt-get install -y nginx mariadb-server nodejs npm supervisor gettext-base && \
    rm -rf /var/lib/apt/lists/*

# Copia os arquivos construídos do estágio 'builder'
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY --from=builder /app/backend/dist /app/backend

# Copia o TEMPLATE do nginx e os outros arquivos de configuração
COPY ./nginx.conf.template /etc/nginx/nginx.conf.template
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh

# Dá permissão de execução para o script de entrada
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expõe a porta 80 do Nginx
EXPOSE 80

# Define o script de entrada e o comando padrão
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]