import "reflect-metadata";
import { DataSource } from "typeorm";
import Producto from './models/productos'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 8080,
    username: "Cuneo",
    password: "Cuneo",
    database: "Productos",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: []
});

const producto1 = new Producto();
producto1.nombre = "Taza";
producto1.modelo = "Grande";
producto1.pais = "Tailandia";
producto1.precio = 50;

const producto2 = new Producto();
producto2.nombre = "Jarrito";
producto2.modelo = "Hondo";
producto2.pais = "Italia";
producto2.precio = 20;

const producto3 = new Producto();
producto3.nombre = "Disco";
producto3.modelo = "Acero";
producto3.pais = "Argentina";
producto3.precio = 120;

async function saveProducts() {
    await AppDataSource.manager.save(producto1);
    await AppDataSource.manager.save(producto3);
    await AppDataSource.manager.save(producto3);
}

saveProducts();