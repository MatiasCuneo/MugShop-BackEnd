import { Response } from 'express';
import { Request } from 'express';

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