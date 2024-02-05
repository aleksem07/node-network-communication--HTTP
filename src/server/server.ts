import http from 'http';
const port = 3002;

export const server = http.createServer((req, res) => {
  console.log('Url:', req.url);
  console.log('Тип запроса:', req.method);
  console.log('User-Agent:', req.headers['user-agent']);
  console.log('Все заголовки');
  console.log(req.headers);

  res.end('Hello Server');
});

server.listen(port, () => {
  console.log(`The server is running on port:${port}`);
});

console.log('sdsdsd23232rss');
