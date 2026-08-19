# Imagen base
FROM mcr.microsoft.com/devcontainers/javascript-node:dev-22

# Establece el directorio de trabajo
WORKDIR /workspace

# Copiar los archivos de pnpm antes de instalar dependencias
COPY package.json pnpm-lock.yaml ./

RUN npm install --global pnpm@9.11.0 \
	&& pnpm install --frozen-lockfile

# Ahora copiar el resto del código fuente
COPY . .

EXPOSE 3001

CMD ["pnpm", "start:dev"]