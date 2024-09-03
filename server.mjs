// import http from 'http';
// import { getGoogleLensData } from './function.mjs'; // Import your code
// import { url } from 'url';

// // const PORT = 80;
// // const HOST = '45.91.236.60';

// const server = http.createServer(async (req, res) => {
//   try {
//     const url = req.url; // Assuming the URL is passed as a query parameter
//     const results = await getGoogleLensData(url);
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(results, null, 2));
//   } catch (error) {
//     console.error(error);
//     res.writeHead(500, { 'Content-Type': 'text/plain' });
//     res.end('Error occurred');
//   }
// });

// server.listen(PORT, HOST, () => {
//   console.log(`Server is running on `);
// });
// import http from 'http';
// import { getGoogleLensData } from './function.mjs';
// import url from 'url';

// const PORT = 3000;
// const HOST = 'localhost';

// const server = http.createServer(async (req, res) => {
//   try {
//     const urlparse = url.parse(req.url, true);
//     const requestUrl = decodeURIComponent(urlparse.query.image_url); // Извлекаем URL-адрес из запроса
//     if (!requestUrl) {
//       res.writeHead(400, { 'Content-Type': 'text/plain' });
//       res.end('URL parameter is required');
//       return;
//     }
//     const results = await getGoogleLensData(requestUrl);
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(results, null, 2));
//   } catch (error) {
//     console.error(error);
//     res.writeHead(500, { 'Content-Type': 'text/plain' });
//     res.end('Error occurred');
//   }
// });

// server.listen(PORT, HOST, () => {
//   console.log(`Server is running on http://${HOST}:${PORT}`);
// });

// import http from 'http';
// import { getGoogleLensData } from './function.mjs';
// import url from 'url';

// const PORT = 3000;
// const HOST = 'localhost';

// const server = http.createServer(async (req, res) => {
//   try {
//     const urlparse = url.parse(req.url, true);
//     const requestUrl = urlparse.query.image_url;
//     if (!requestUrl) {
//       res.writeHead(400, { 'Content-Type': 'text/plain' });
//       res.end('Image URL parameter is required');
//       return;
//     }
//     requestUrl = decodeURIComponent(requestUrl).replace(/^https?:\/\//, '');
//     const results = await getGoogleLensData(requestUrl);
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(results, null, 2));
//   } catch (error) {
//     // console.error(error);
//     // res.writeHead(500, { 'Content-Type': 'text/plain' });
//     // res.end(`Error occurred ${error.message}`);
//     console.error('Error occurred:', error.message, error.stack);
//   console.error('Request URL:', req.url);
//   console.error('Request headers:', req.headers);
//   console.error('Request query:', urlparse.query);
//   res.writeHead(500, { 'Content-Type': 'text/plain' });
//   res.end(`Error occurred: ${error.message}`);
//   }
// });

// server.listen(PORT, HOST, () => {
//   console.log(`Server is running on http://${HOST}:${PORT}`);
// });

// Создаем маршрут для вызова функции getGoogleLensData
// app.post('/google-lens', async (req, res) => {
//   const { url } = req.body;
//   if (!url) {
//     res.status(400).send({ error: 'URL не указан' });
//     return;
//   }
//   try {
//     const results = await getGoogleLensData(url);
//     res.send(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Внутренняя ошибка сервера' });
//   }
// });





import express from 'express';
import { getGoogleLensData } from './function.mjs';

const app = express();
const port = 80;

// Middleware для обработки JSON-запросов
app.use(express.json());

app.post('/google-lens', async (req, res) => {
  const url = req.body.url || req.query.url;
  if (!url) {
    res.status(400).send({ error: 'URL не указан' });
    return;
  }
  try {
    const results = await getGoogleLensData(url);
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Внутренняя ошибка сервера' });
  }
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Сервер запущен на порте ${port}`);
});