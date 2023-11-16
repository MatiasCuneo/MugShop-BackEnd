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
        const productRepository = connection.getRepository(Producto);
        const existingProducts = await productRepository.find();

        if (existingProducts.length === 0) {
            const producto1 = new Producto("Taza", "Grande", "Tailandia", 50);
            const producto2 = new Producto("Jarrito", "Hondo", "Italia", 20);
            const producto3 = new Producto("Disco", "Acero", "Argentina", 120);

            await productRepository.save([producto1, producto2, producto3]);
        }

        console.log("Base inicializada correctamente");

        await connection.close();
    }).catch((error) => {
        console.log("Error al inicializar la base: ", error)
    });