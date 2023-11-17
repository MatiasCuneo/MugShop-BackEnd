import express from 'express';
import cors from 'cors';
import routes from './router/routes';
import 'reflect-metadata';
import './db';

const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
