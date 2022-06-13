import { NextFunction, Request, Response } from 'express';

export function GlobalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('GlobalMiddleware');

  next();
}
