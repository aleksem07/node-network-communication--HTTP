import http from 'http';
import { users } from '../data/users';
import { AppRoutes } from '../common/routes';
import { validate } from 'uuid';
import { IUsers } from '../data/users';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import cluster from 'cluster';
import os from 'os';

require('dotenv').config();

const PORT: number = Number(process.env.PORT || 3000);
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running. Listening on port ${PORT}`);

  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
  });
} else {
  const workerPort: number = PORT + (cluster.worker?.id || 0);
  const server = http.createServer((req, res) => {
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

        fs.writeFile(
          './src/data/users.js',
          `exports.users = ${JSON.stringify(users, null, 2)};`,
          (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end(err.message);
            }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(`User created`);
          }
        );
      });
    } else if (method === 'DELETE' && url.startsWith(`${AppRoutes.USERS}/`)) {
      if (!validate(userId)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('userId is invalid (not uuid)');
        return;
      }

      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("User doesn't exist");
        return;
      }

      users.splice(userIndex, 1);

      fs.writeFile(
        './src/data/users.js',
        `exports.users = ${JSON.stringify(users, null, 2)};`,
        (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(err.message);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(`User deleted`);
        }
      );
    } else if (method === 'PUT' && url.startsWith(`${AppRoutes.USERS}/`)) {
      if (!validate(userId)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('userId is invalid (not uuid)');
        return;
      }

      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("User doesn't exist");
        return;
      }

      const body: Buffer[] = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      });
      req.on('end', () => {
        const parsedBody = JSON.parse(Buffer.concat(body).toString());
        users[userIndex] = {
          ...users[userIndex],
          ...parsedBody,
        };

        fs.writeFile(
          './src/data/users.js',
          `exports.users = ${JSON.stringify(users, null, 2)};`,
          (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end(err.message);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(`User updated`);
          }
        );
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  });

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} started. Listening on port ${workerPort}`);
  });
}
