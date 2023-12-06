import { Router } from 'express';
import { createUser, fetchUser, fetchUsers, signin } from './user.controller';

const router = Router();

router.get('/user', fetchUsers);

router.get('/user/:id', fetchUser);

router.post('/signup', createUser);

router.post('/signin', signin);

router.post('/signout', signin);

router.put('/user/:id', (req, res) => {});

router.delete('/user/:id', (req, res) => {});

export default router;
