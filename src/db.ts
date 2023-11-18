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
            const producto1 = new Producto("Cup 1", "Descripcion para Cup 1", "Plottable", 50, "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80");
            const producto2 = new Producto("Cup 2", "Descripcion para Cup 2", "Plain", 29.99, "https://images.unsplash.com/photo-1570784332176-fdd73da66f03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80");
            const producto3 = new Producto("Cup 3", "Descripcion para Cup 3", "Plain", 29.99, "https://images.unsplash.com/photo-1570784332176-fdd73da66f03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80");
            const producto4 = new Producto("Cup 4", "Descripcion para Cup 4", "Plain", 29.99, "https://images.unsplash.com/photo-1570784332176-fdd73da66f03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80");
            const producto5 = new Producto("Cup 5", "Descripcion para Cup 5", "Plain", 29.99, "https://images.unsplash.com/photo-1570784332176-fdd73da66f03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80");

            await productRepository.save([producto1, producto2, producto3, producto4, producto5]);
        }

        console.log("Base inicializada correctamente");

        await connection.close();
    }).catch((error) => {
        console.log("Error al inicializar la base: ", error)
    });