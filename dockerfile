# Usar a imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código para dentro do contêiner
COPY . .

# Expor a porta 3000 onde o Next.js irá rodar
EXPOSE 3000

# Rodar o Next.js em modo de desenvolvimento
CMD ["npm", "run", "dev"]
