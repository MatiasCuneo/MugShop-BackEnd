import { Router } from 'express';
import { loginUser, registerUser, registerCart, retrieveProducts } from '../controller/contollers';

const router: Router = Router();

router.post('/login/try', loginUser);

router.post('/register/success', registerUser);

router.post('/cart', registerCart);

router.get('/products', retrieveProducts);

export default router;