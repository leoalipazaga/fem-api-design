import { Router } from 'express';
import * as controller from './update.controller';
import { hasBody } from '../middleware/hasBody';

const router = Router();

router.get('/update', controller.fetchUpdates);

router.get('/update/:id', controller.fetchUpdate);

router.post(
  '/update',
  hasBody('body', 'title', 'productId'),
  controller.createUpdate
);

router.put('/update/:id', controller.updateUpdates);

router.delete('/update/:id', controller.deleteUpdate);

export default router;
