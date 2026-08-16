import { Router } from 'express';
import * as serviceOrdersController from './service-orders.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();
router.use(authMiddleware);
router.get('/', serviceOrdersController.getAll);
router.post('/', serviceOrdersController.create);
router.delete('/:id', serviceOrdersController.remove);

export default router;