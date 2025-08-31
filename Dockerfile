# Usar una imagen oficial de Node.js
FROM node:18-slim

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que la aplicación usará
EXPOSE 8000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]