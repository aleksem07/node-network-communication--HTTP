import http from 'http';
import { users } from '../data/users';
import { homePage } from '../components/home-page';
import { AppRoutes } from '../common/routes';
import { validate } from 'uuid';
import { IUsers } from '../data/users';
import { v4 as uuidv4 } from 'uuid';

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

  if (method === 'GET' && url === AppRoutes.HOME) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(homePage);
  }

  if (method === 'GET' && url === AppRoutes.USERS) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (method === 'GET' && url.startsWith(`${AppRoutes.USERS}/`)) {
    if (!validate(userId)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('userId is invalid (not uuid)');
      return;
    }

    const user = users.find((user) => user.id === userId);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end("User  doesn't exist");
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else if (method === 'POST' && url === AppRoutes.USERS) {
    const body: Buffer[] = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = JSON.parse(Buffer.concat(body).toString());
      const newUser: IUsers = {
        id: uuidv4(),
        ...parsedBody,
      };

      if (!newUser.username || !newUser.age || !newUser.hobbies) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('request body does not contain required fields (username or age or hobbies)');
        return;
      }
      users.push(newUser);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(`User created`);
    });
  }
});

server.listen(PORT, () => {
  console.log(`The server is running on port:${PORT}`);
});
