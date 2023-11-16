import "reflect-metadata";
import { createConnection } from "typeorm";
import Producto from './models/productos'
import User from './models/user';
import Cart from './models/carrito';

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "Cuneo",
    password: "Cuneo",
    database: "MugShop",
    synchronize: true,
    logging: true,
    entities: [Producto, User, Cart],
    subscribers: [],
    migrations: []
})
    .then(async (connection) => {
        // ========== PRODUCTS ==========
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

        await connection.manager.save(producto1);
        await connection.manager.save(producto2);
        await connection.manager.save(producto3);    

        // ========== REGISTER ==========


        // ========== LOGIN ==========

        console.log("Base inicializada correctamente");

        await connection.close();
    }).catch((error) => {
        console.log("Error al inicializar la base: ", error)
    });