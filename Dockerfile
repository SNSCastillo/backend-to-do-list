# Imagen base
FROM mcr.microsoft.com/devcontainers/javascript-node:dev-22

# Establece el directorio de trabajo
WORKDIR /workspace

# Copiar package.json y package-lock.json antes de instalar dependencias
COPY package*.json ./

RUN npm install

# Ahora copiar el resto del código fuente
COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
