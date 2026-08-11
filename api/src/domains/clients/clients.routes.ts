import { Router } from 'express';
import * as clientsController from './clients.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();
router.use(authMiddleware);
router.get('/', clientsController.getAll);
router.post('/', clientsController.create);
router.delete('/:id', clientsController.remove);

export default router;