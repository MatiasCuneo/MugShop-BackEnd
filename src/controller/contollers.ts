import { Response } from 'express';
import { Request } from 'express';
import User from '../models/user';
import { createConnection, getRepository } from 'typeorm';

const products = [
    {nombre:"Taza", modelo:"Grande", pais:"Tailandia", precio:50},
    {nombre:"Jarrito", modelo:"Hondo", pais:"Italia", precio:20},
    {nombre:"Disco", modelo:"Acero", pais:"Argentina", precio:120}
]; 

export default products;

export function showProducts(_: any, res: Response, arrays: { nombre: string; modelo: string; pais: string; precio: number; }[]) {
    res.json(arrays);
}

export function filter(_: any, res: Response, arrays: { nombre: string; modelo: string; pais: string; precio: number; }[]) {
    res.json(arrays.filter(producto => producto.precio > 100));
}

export function modify(req: Request, res: Response, arrays: { nombre: string; modelo: string; pais: string; precio: number; }[]) {
    const { nombre } = req.params;
    const { modeloNew, paisNew, precioNew} = req.body;

    const i = arrays.findIndex(producto => producto.nombre === nombre);

    if (i !== -1) {
        arrays[i].modelo = modeloNew;
        arrays[i].pais = paisNew;
        arrays[i].precio = precioNew;

        res.status(201).json(arrays);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
}

export function borrar(req: Request, res: Response, arrays: { nombre: string; modelo: string; pais: string; precio: number; }[]) {
    const { modelo } = req.params;
    const i = arrays.findIndex(producto => producto.modelo === modelo);

    if (i !== -1) {
        arrays.splice(i, 1);
        res.json(arrays);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
}

export function paisOrigen(req: Request, res: Response, arrays: { nombre: string; modelo: string; pais: string; precio: number; }[]) {
    const { paisOrigen } = req.params;
    const producto = arrays.find(producto => producto.pais === paisOrigen);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
}

export function precio(req: Request, res: Response, arrays: { nombre: string; modelo: string; pais: string; precio: number; }[]) {
    const { precioFind } = req.params;
    const price = parseInt(precioFind);

    const producto = arrays.filter(producto => producto.precio === price);

    if (producto) {
        res.json(producto);
    } else {
        res.send('Producto no encontrado');
    }
}

export function add(req: Request, res: Response, arrays: { nombre: string; modelo: string; pais: string; precio: number; }[]) {
    const { nombreNew, modeloNew, paisNew, precioNew } = req.body;
    const newProduct = {nombre:nombreNew, modelo:modeloNew, pais:paisNew, precio:precioNew};

    arrays.push(newProduct);

    res.status(201).send(arrays);
}

// ================================================================

// const users: User[] = [];

// export const registerUser = (req: Request, res: Response) => {
//     const { usuario, email, password, password2 } = req.body;

//     if (usuario == null || password == null) {
//         return res.status(400).json({ msg: "El usuario y contraseña son obligarotios" });
//     }

//     let existUser = false;

//     users.forEach((e) => {
//         if (usuario == e.usuario) {
//             existUser = true;
//             return;
//         }
//     });

//     if (existUser) {
//         return res.status(400).json({ msg: "El usuario ya esta en uso" });
//     }

//     if (password !== password2) {
//         return res.status(400).json({ msg: "Las contraseñas no coinciden" });
//     }

//     const user = new User(usuario, email, password);

//     users.push(user);

//     return res.status(201).json({
//         msg: "Usuario creado exitosamente",
//         user
//     });
// };

export const registerUser = async (req: Request, res: Response) => {
    const { usuario, email, password } = req.body;

    const userRepository = getRepository(User);

    const existingUser = await userRepository.findOne({ where: [{ usuario }, { email }] });
    if (existingUser) {
        return res.status(400).json({ error: 'El Usuario o Email ya esta en uso' });
    }

    const newUser = userRepository.create({
        usuario,
        email,
        password,
    });

    try {
        await userRepository.save(newUser);
        return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    const [usuario, password] = req.body;

    try {
        const connection = await createConnection();

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
