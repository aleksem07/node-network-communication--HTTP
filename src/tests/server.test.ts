const request = require('supertest');
const server = require('../server/server');

describe('server', () => {
  test('GET /api/users - Get all users (expect empty array)', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
