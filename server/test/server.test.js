let app = require('../server');
let testServer = require('supertest');

describe('Test ROOT pathing', () => {

  test('should return 200 for /logout', async () => {
    // Make a request!
    const response = await testServer(app)
      .post('api/user/logout')
    // Analyze response!
    expect(response.statusCode).toBe(200);
  })
})
