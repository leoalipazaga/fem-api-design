import { NextFunction, Request, Response } from 'express';

export const hasBody = (...keys: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (keys.every((key) => req.body[key])) {
      next();
      return;
    }
    res.status(400);
    res.json({ error: `${keys.join(', ')} is required` });
  };
};
