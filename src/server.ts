import express from 'express';
import routes from "./router/routes"

const app = express();
const port = 8080;

app.use('/', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});