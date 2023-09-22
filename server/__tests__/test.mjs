const request = require('supertest');
const app = require('../index.js');

decribe('API routes', () => {
  it('should register a user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .field('email', 'test@example.com')
      .field('password', 'password123')
      .attach('picture', '../public/assets/info2.jpeg');
    expect(response.status).toBe(200);
  });
});
