import http from 'http';
const port = 3000;

export const server = http.createServer((req, res) => {
  console.log('Url:', req.url);
  console.log('Тип запроса:', req.method);
  console.log('User-Agent:', req.headers['user-agent']);
  console.log('Все заголовки');
  console.log(req.headers);

  res.end('Hello Server12qw3');
});

server.listen(port, () => {
  console.log(`The server is running on port:${port}`);
});
