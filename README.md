# Amazon Scraper API

Un servicio simple para realizar scraping de páginas de productos de Amazon, desplegable con Docker.

## Características

- **Scraping por URL**: Proporciona una URL completa de un producto de Amazon y obtén el HTML.
- **Scraping por ASIN**: Proporciona un ASIN/SKU y un marketplace (ej: `es`, `com`, `fr`) para obtener el HTML.
- **Rotación de User-Agent**: Utiliza una lista de User-Agents comunes para reducir la probabilidad de bloqueo.
- **Contenerizado**: Listo para desplegar con Docker y Docker Compose.

## Tecnología

- **Backend**: Node.js con Express.js
- **Cliente HTTP**: Axios
- **Contenerización**: Docker / Docker Compose

## Requisitos Previos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (generalmente incluido con Docker Desktop)

## Instalación y Uso

1. Clone o descargue este repositorio.
2. En la raíz del proyecto, ejecute el siguiente comando para construir la imagen y levantar el contenedor en segundo plano:

   ```bash
   docker-compose up --build -d
   ```

El servicio estará ahora corriendo y accesible en `http://localhost:8000`.

## Endpoints de la API

### 1. Scrape por URL

- **Método**: `POST`
- **Endpoint**: `/scrape-url`
- **Body (JSON)**:
  ```json
  {
    "url": "URL_COMPLETA_DEL_PRODUCTO_EN_AMAZON"
  }
  ```
- **Ejemplo con `curl`**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"url": "https://www.amazon.es/dp/B08C76W234"}' http://localhost:8000/scrape-url
  ```

### 2. Scrape por ASIN

- **Método**: `POST`
- **Endpoint**: `/scrape-asin`
- **Body (JSON)**:
  ```json
  {
    "asin": "ASIN_DEL_PRODUCTO",
    "marketplace": "es"
  }
  ```
- **Ejemplo con `curl`**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"asin": "B08C76W234", "marketplace": "es"}' http://localhost:8000/scrape-asin
  ```

## Para detener el servicio

Para detener y eliminar el contenedor, ejecute:

```bash
docker-compose down
```
