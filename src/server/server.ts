import http from 'http';
import { users } from '../data/users';
import { homePage } from '../components/home-page';
import { AppRoutes } from '../common/routes';
import { validate } from 'uuid';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

export const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (!url) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const userId = url.split('/').filter((item) => item)[2];

  if (method === 'GET' && url === AppRoutes.USERS) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (method === 'GET' && url.startsWith(`${AppRoutes.USERS}/`)) {
    console.log(url);
    console.log('userId:' + userId);

    if (!validate(userId)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('User not found');
      return;
    }

    const user = users.find((user) => user.id === userId);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('User not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  if (method === 'GET' && url === AppRoutes.HOME) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(homePage);
  }
});

server.listen(PORT, () => {
  console.log(`The server is running on port:${PORT}`);
});
