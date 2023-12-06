import type { Request, Response } from 'express';
import { comparePassword, createJWT, hashPassword } from '../infra/auth';
import prisma from '../infra/prisma';

export const fetchUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200);
    res.json({ users });
  } catch (error) {
    res.status(403);
    res.json({ error });
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: req.params.id } });
    res.status(200);
    res.json({ user });
  } catch (error) {
    res.status(403);
    res.json({ error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const password = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password,
      },
    });
    const token = createJWT(user);
    res.status(200);
    res.json({ token });
  } catch (error) {
    res.status(501);
    res.json({ error });
  }
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: { username: req.body.username },
  });
  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: 'password is not valid' });
    return;
  }

  res.status(200);
  res.json({ token: createJWT(user) });
};
