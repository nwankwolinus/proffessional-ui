import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

// Set up the PostgreSQL client
const pool = new Pool({
  user: 'mainuser',
  host: 'localhost',
  database: 'maindb',
  password: 'mypassword',
  port: 5432,
});

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Define the new API endpoint
app.get('/awesome/applicant', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM my_info LIMIT 1');
    const funInfo = result.rows[0];
    res.json(funInfo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.put('/awesome/applicant', async (req, res) => {
  const { name, hobby, favorite_food, fun_fact } = req.body;
  try {
    const result = await pool.query(
      'UPDATE my_info SET name = $1, hobby = $2, favorite_food = $3, fun_fact = $4 WHERE id = 1 returning *',
      [name, hobby, favorite_food, fun_fact]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error')
  };
});

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;