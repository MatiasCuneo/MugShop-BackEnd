import { Router } from 'express';
import { showProducts } from '../controller/contollers';
import { filter } from '../controller/contollers';
import { modify } from '../controller/contollers';
import { borrar } from '../controller/contollers';
import { paisOrigen } from '../controller/contollers';
import { precio } from '../controller/contollers';
import { add } from '../controller/contollers';
import products from '../controller/contollers';

const router: Router = Router();

router.get('/', (_, res) => {
    showProducts(_, res, products);
});

router.get('/mayora100', (_, res) => {
    filter(_, res, products);
});

router.put('/modif/:nombre', (req, res) => {
    modify(req, res, products);
});

router.delete('/borrar/:modelo', (req, res) => {
    borrar(req, res, products);
});

router.get('/productos/pais/:paisOrigen', (req, res) => {
    paisOrigen(req, res, products);
});

router.get('/productos/precio/:precioFind', (req, res) => {
    precio(req, res, products);
});

router.post('/agregar', (req, res) => {
    add(req, res, products);
});

export default router;