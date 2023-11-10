import "reflect-metadata";
import { DataSource } from "typeorm";
import Producto from './models/productos'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "lcalhost",
    port: 8080,
    username: "Cuneo",
    password: "Cuneo",
    database: "productos",
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

async function saveProduct1() {
    await AppDataSource.manager.save(producto1);
}

async function saveProduct2() {
    await AppDataSource.manager.save(producto3);
}

async function saveProduct3() {
    await AppDataSource.manager.save(producto3);
}

saveProduct1();
saveProduct2();
saveProduct3();