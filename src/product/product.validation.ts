import type { NextFunction, Request, Response } from 'express';
import e from 'express';

export const isEmpty = (req: Request, _: Response, next: NextFunction) => {
  if (Object.entries(req.body).length) {
    next();
  }
};

export const body = (...keys: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (keys.every((key) => req.body[key])) {
      next();
      return;
    }
    res.status(400);
    res.json({ error: `${keys.join(', ')} is required` });
  };
};
