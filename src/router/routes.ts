import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', (_, res) => {
    res.send('Test');
});

export default router;