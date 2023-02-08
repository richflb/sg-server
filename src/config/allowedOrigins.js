const SEUGUIA_URL = process.env.SEUGUIA_URL
const allowedOrigins = [
    'https://www.yoursite.com',
     SEUGUIA_URL,
    'http://127.0.0.1:5500',
    'http://localhost:3501',
    'http://localhost:3000'
];

module.exports = allowedOrigins;