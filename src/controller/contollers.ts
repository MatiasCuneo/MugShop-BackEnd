import { Response } from 'express';
import { Request } from 'express';
import User from '../models/user';
import Cart from '../models/carrito';
import { createConnection, Connection } from 'typeorm';

let connection: Connection | null = null;

export const getDatabaseConnection = async (): Promise<Connection> => {
  if (!connection || !connection.isConnected) {
    connection = await createConnection();
  }
  return connection;
};

export const registerUser = async (req: Request, res: Response) => {
    const { usuario, email, password, password2 } = req.body;

    try {
        const connection = await getDatabaseConnection();

        if (password !== password2) {
            return res.status(403).json({ msg: "Las contrasenas deben ser coincidentes" });
        }

        const existingUser = await connection.manager.findOne(User, { where: { usuario, email } });

        if (existingUser) {
            return res.status(400).json({ error: 'El Usuario o Email ya esta en uso' });
        } else {
            const newUser = new User(usuario, email, password);

            try {
                await connection.manager.save(newUser);
                await connection.close();

                return res.status(201).json({ message: 'Usuario registrado exitosamente' });
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                return res.status(500).json({ error: 'Error al conectar con la base de datos' });
            }
        }

    } catch (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }  
};


export const loginUser = async (req: Request, res: Response) => {
    const { usuario, password } = req.body;

    try {
        const connection = await getDatabaseConnection();

        const user = await connection.manager.findOne(User, { where: { usuario, password } });

        await connection.close();

        if (user) {
            res.json({
                success: true,
                msg: "Ingreso correcto"
            });
        } else {
            res.status(401).json({
                success: false,
                msg: "Ingreso fallido"
            });
        }
    } catch (err) {
        console.log("Error al ingresar: ", err);
        res.status(500).json({
            success: false,
            msg: "Error al ingresar"
        });
    }
};

export const registerCart = async (req: Request, res: Response) => {
    const { jsonifiedCart } = req.body;

    try {
        const connection = await getDatabaseConnection();

        const cartEntity = new Cart(jsonifiedCart);

        await connection.manager.save(Cart, cartEntity);
        await connection.close();

        return res.status(201).json({ message: 'Carrito registrado exitosamente' });

    } catch (err) {
        console.error('Error al registrar el carrito:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }  
};