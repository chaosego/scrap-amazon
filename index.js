const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware para parsear JSON
app.use(express.json());

// Lista de User-Agents para rotar
const USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
];

/**
 * Función interna para obtener el HTML de una URL
 * @param {string} url - La URL a scrapear
 * @returns {Promise<string>} - El contenido HTML de la página
 */
async function getPageHtml(url) {
    const headers = {
        'User-Agent': USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
    };
    try {
        const response = await axios.get(url, { headers, timeout: 10000 });
        return response.data;
    } catch (error) {
        console.error(`Error fetching URL: ${url}`, error.message);
        // Lanza el error para que el endpoint lo maneje
        throw new Error(`Error al contactar la URL: ${error.message}`);
    }
}

// Endpoint raíz
app.get('/', (req, res) => {
    res.send({ message: 'Bienvenido al Amazon Scraper API con Node.js. Use los endpoints /scrape-url o /scrape-asin.' });
});

// Endpoint para scrapear por URL
app.post('/scrape-url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'La URL es requerida.' });
    }
    if (!url.includes('amazon')) {
        return res.status(400).json({ error: 'La URL proporcionada no parece ser de Amazon.' });
    }

    try {
        const html = await getPageHtml(url);
        res.json({ html });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para scrapear por ASIN
app.post('/scrape-asin', async (req, res) => {
    const { asin, marketplace } = req.body;

    if (!asin || !marketplace) {
        return res.status(400).json({ error: 'Se requiere tanto \'asin\' como \'marketplace\'.' });
    }

    const cleanMarketplace = marketplace.replace(/[.\/]/g, '');
    const url = `https://www.amazon.${cleanMarketplace}/dp/${asin}`;

    try {
        const html = await getPageHtml(url);
        res.json({ html });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});