#!/bin/bash
set -e

# --- VERIFICAÇÃO INICIAL ---
# Garante que as variáveis de ambiente essenciais foram definidas.
if [ -z "${DB_USER}" ] || [ -z "${DB_PASSWORD}" ] || [ -z "${DB_DATABASE}" ] || [ -z "${DB_ROOT_PASSWORD}" ]; then
  echo "ERRO: As seguintes variáveis de ambiente devem ser definidas: DB_USER, DB_PASSWORD, DB_DATABASE, DB_ROOT_PASSWORD"
  exit 1
fi

DB_DIR="/var/lib/mysql"

if [ ! -d "$DB_DIR/mysql" ]; then
    echo "Diretório do MariaDB não encontrado. Inicializando..."
    mysql_install_db --user=mysql --datadir="$DB_DIR"
    mysqld_safe --datadir="$DB_DIR" --user=mysql &
    pid="$!"
    sleep 5

    # WIP - Vou remodelar o banco de dados e usar migrations no nestjs
    mysql -u root <<-EOSQL
        SET @MYSQL_ROOT_PASSWORD = '${DB_ROOT_PASSWORD}';
        ALTER USER 'root'@'localhost' IDENTIFIED BY @MYSQL_ROOT_PASSWORD;
        DELETE FROM mysql.user WHERE User='';
        DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
        DROP DATABASE IF EXISTS test;
        DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

        CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;
        CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
        GRANT ALL PRIVILEGES ON \`${DB_DATABASE}\`.* TO '${DB_USER}'@'localhost';
        FLUSH PRIVILEGES;
EOSQL

    kill -s TERM "$pid"
    wait "$pid"
    echo "Inicialização do MariaDB concluída."
fi

exec "$@"