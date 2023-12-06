import type { Request, Response } from 'express';
import prisma from '../infra/prisma';

export const fetchProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.body.auth.id },
    });
    res.status(200);
    res.json({ products });
  } catch (error) {
    res.status(403);
    res.json({ error });
  }
};

export const fetchProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await prisma.product.findFirst({
      where: { id: id, userId: req.body.auth.id },
    });
    res.status(200);
    res.json({ product });
  } catch (error) {
    res.status(403);
    res.json({ error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({
      data: { name: req.body.name, userId: req.body.auth.id },
    });
    res.status(200);
    res.json({ product });
  } catch (error) {
    res.status(403);
    res.json({ error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.update({
      data: { name: req.body.name },
      where: { id: req.params.id },
    });
    res.status(200);
    res.json({ product });
  } catch (error) {
    res.status(403);
    res.json({ error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.delete({
      where: { id: req.params.id, userId: req.params.userId },
    });
    res.status(200);
    res.json({ product });
  } catch (error) {
    res.status(403);
    res.json({ error });
  }
};
