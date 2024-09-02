import http from 'http';
import { getGoogleLensData } from './function.mjs'; // Import your code

const PORT = 80;
const HOST = '45.91.236.60';

const server = http.createServer(async (req, res) => {
  try {
    const url = req.url; // Assuming the URL is passed as a query parameter
    const results = await getGoogleLensData(url);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error occurred');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});