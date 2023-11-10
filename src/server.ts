import express from 'express';
import routes from "./router/routes"
import "reflect-metadata";
import Producto from './models/productos';
// import { AppDataSource } from './config';

const app = express();
const port = 8080;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

const producto = new Producto;
producto.nombre = "Cuchara";
producto.modelo = "Pequeña";
producto.pais = "Camboya";
producto.precio = 54.99;

// await AppDataSource.manager.save(producto);