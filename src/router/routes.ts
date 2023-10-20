import { Router } from 'express';

const router: Router = Router();

router.get('/', (_, res) => {
    res.send('Test');
});

export default router;