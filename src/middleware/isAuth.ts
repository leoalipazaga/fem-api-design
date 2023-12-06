import type { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  const token = authorization.split(' ')[1];

  // if (!token) {
  //   res.status(401);
  //   res.json({ message: 'invalid token' });
  //   return;
  // }

  try {
    const t = jwt.verify(token, process.env.JWT_SECRET);
    req.body.auth = t;
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: 'invalid token' });
  }
};
