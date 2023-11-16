import "reflect-metadata";
import { createConnection } from "typeorm";
import Producto from './models/productos'
import User from './models/user';
import Cart from './models/carrito';

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "mugshop",
    synchronize: true,
    logging: true,
    entities: [Producto, User, Cart],
    subscribers: [],
    migrations: []
})
    .then(async (connection) => {
        // ========== PRODUCTS ==========
        const producto1 = new Producto("Taza", "Grande", "Tailandia", 50);
        const producto2 = new Producto("Jarrito", "Hondo", "Italia", 20);
        const producto3 = new Producto("Disco", "Acero", "Argentina", 120);

        // await connection.manager.save(producto1);
        // await connection.manager.save(producto2);
        // await connection.manager.save(producto3);

        await connection.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(producto1);
            await transactionalEntityManager.save(producto2);
            await transactionalEntityManager.save(producto3);
        });

        // ========== REGISTER ==========

        console.log("Base inicializada correctamente");

        await connection.close();
    }).catch((error) => {
        console.log("Error al inicializar la base: ", error)
    });