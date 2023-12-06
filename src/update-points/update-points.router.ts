import { Router } from 'express';
import * as controller from '../update/update.controller';

const router = Router();

router.get('/update-points', controller.fetchUpdates);

router.get('/update-points/:id', controller.fetchUpdate);

router.post('/update-points', controller.createUpdate);

router.put('/update-points/:id', controller.updateUpdates);

router.delete('/update-points/:id', controller.deleteUpdate);

export default router;
