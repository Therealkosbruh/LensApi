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
