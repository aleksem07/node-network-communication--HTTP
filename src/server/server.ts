import http from 'http';
const port = 3000;

export const server = http.createServer((req, res) => {
  res.end('Hello Server');
});

server.listen(port, () => {
  console.log(`The server is running on port:${port}`);
});
