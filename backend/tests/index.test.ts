import request from 'supertest';
import app from '../src/server';

// Mock the pg module before importing the app
jest.mock('pg', () => require('./mocks/pg'));

describe('GET /', () => {
  it('should return Hello, world!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, world!');
  });
});

describe('GET /awesome/applicant', () => {
  it('should return fun information about the applicant', async () => {
    const response = await request(app).get('/awesome/applicant');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Linus Nwankwo",
      hobby: "Reading",
      favorite_food: "Beans",
      fun_fact: "Loves running",
    });
  });
});

describe('PUT /awesome/applicant', () => {
  it('should update applicant information', async () => {
    const updateData = {
      name: 'John Doe',
      hobby: 'Reading',
      favorite_food: 'Pizza',
      fun_fact: 'Loves hiking',
    };
    const res = await request(app)
      .put('/awesome/applicant')
      .send(updateData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', updateData.name);
    expect(res.body).toHaveProperty('hobby', updateData.hobby);
    expect(res.body).toHaveProperty('favorite_food', updateData.favorite_food);
    expect(res.body).toHaveProperty('fun_fact', updateData.fun_fact);
  });
});
 