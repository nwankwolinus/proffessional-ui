// tests/__mocks__/pg.ts
const actualPg = jest.requireActual('pg');

const testPool = new actualPg.Pool({
  user: 'testuser',
  host: 'localhost',
  database: 'testdb',
  password: 'testpassword',
  port: 5432,
});

module.exports = {
  ...actualPg,
  Pool: jest.fn(() => testPool),
};
