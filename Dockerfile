# Usar una imagen oficial de Node.js
FROM node:22-slim

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que la aplicación usará
EXPOSE 3469

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]