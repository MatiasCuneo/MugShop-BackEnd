import { Router } from 'express';

const router: Router = Router();

const products = [
    {nombre:"Taza", modelo:"Grande", pais:"Tailandia", precio:50},
    {nombre:"Jarrito", modelo:"Hondo", pais:"Italia", precio:20},
    {nombre:"Disco", modelo:"Acero", pais:"Argentina", precio:120}
]; 

router.get('/', (_, res) => {
    res.json(products);
});

router.get('/mayora100', (_, res) => {
    res.json(products.filter(producto => producto.precio > 100));
});

router.put('/modif/:nombre', (req, res) => {
    const { nombre } = req.params;
    const { modeloNew, paisNew, precioNew} = req.body;

    const i = products.findIndex(producto => producto.nombre === nombre);

    if (i !== -1) {
        products[i].modelo = modeloNew;
        products[i].pais = paisNew;
        products[i].precio = precioNew;

        res.status(201).json(products);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

router.delete('/borrar/:modelo', (req, res) => {
    const { modelo } = req.params;
    const i = products.findIndex(producto => producto.modelo === modelo);

    if (i !== -1) {
        products.splice(i, 1);
        res.json(products);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

router.get('/productos/pais/:paisOrigen', (req, res) => {
    const { paisOrigen } = req.params;
    const producto = products.find(producto => producto.pais === paisOrigen);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

router.get('/productos/precio/:precioFind', (req, res) => {
    const { precioFind } = req.params;
    const price = parseInt(precioFind);

    const producto = products.filter(producto => producto.precio === price);

    if (producto) {
        res.json(producto);
    } else {
        res.send('Producto no encontrado');
    }
});

router.post('/agregar', (req, res) => {
    const { nombreNew, modeloNew, paisNew, precioNew } = req.body;
    const newProduct = {nombre:nombreNew, modelo:modeloNew, pais:paisNew, precio:precioNew};

    products.push(newProduct);

    res.status(201).send(products);
});

export default router;