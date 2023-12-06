import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';
import prisma from '../infra/prisma';

export const fetchUpdates = async (req: Request, res: Response) => {
  // TODO: IMPROVE
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.body.auth.id },
      include: { updates: true },
    });
    const updates = products.flatMap((p) => p.updates);
    res.status(200);
    res.json({ updates });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

export const fetchUpdate = async (req: Request, res: Response) => {
  const updateId = req.params.id;
  const update = await prisma.updatePoint.findFirst({
    where: { id: updateId },
  });
  try {
    res.status(200);
    res.json({ update });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

export const createUpdate = async (req: Request, res: Response) => {
  try {
    // const product = await prisma.product.findUnique({
    //   where: { id: req.body.id },
    // });
    // if (!product) {
    //   res.status(400);
    //   return res.json({ error: 'product not found' });
    // }
    const update = await prisma.update.create({
      data: {
        productId: req.body.productId,
        title: req.body.title,
        body: req.body.body,
        updatedAt: new Date(),
      },
    });
    res.status(200);
    res.json({ update });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400);
      res.json({ error: 'product not found' });
      return;
    }
    res.status(400);
    res.json({ error });
  }
};

export const updateUpdates = async (req: Request, res: Response) => {
  try {
    // const products = await prisma.product.findMany({
    //   where: {
    //     userId: req.body.auth.id,
    //   },
    //   include: { updates: true },
    // });
    // const updates = products.flatMap((p) => p.updates);
    // const match = updates.find((p) => p.id === req.params.id);
    // if (!match) {
    //   res.status(204);
    //   return res.json({ error: 'update not found' });
    // }
    const update = await prisma.update.update({
      where: { id: req.params.id },
      data: {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        version: req.body.version,
        updatedAt: new Date(),
      },
    });
    res.json({ update });
    res.status(200);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

export const deleteUpdate = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: req.body.auth.id,
      },
      include: { updates: true },
    });
    const updates = products.flatMap((p) => p.updates);
    const match = updates.find((p) => p.id === req.params.id);
    if (!match) {
      res.status(204);
      return res.json({ error: '' });
    }
    const update = await prisma.update.delete({
      where: { id: req.params.id },
    });
    res.json({ update });
    res.status(200);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};
