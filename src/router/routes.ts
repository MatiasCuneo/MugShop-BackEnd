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


router.delete('/borrar/:modelo', (req, res) => {
    const { modelo } = req.params;
    console.log(modelo);
    const i = products.findIndex(producto => producto.modelo === modelo);
    console.log(i);

    if (i >= 0) {
        products.splice(i, 1);
        res.send("Producto eliminado exitosamente");
    } else {
        res.status(404).send("No se pudo encontrar el producto");
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
  

// ---------------------------------------



// const products = [
//     {nombre:"Taza", modelo:"Grande", pais:"Tailandia", precio:50},
//     {nombre:"Jarrito", modelo:"Hondo", pais:"Italia", precio:20},
//     {nombre:"Disco", modelo:"Acero", pais:"Argentina", precio:120}
// ]; 

// ---------------------------------------

export default router;