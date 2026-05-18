import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 'P2002') {
    error = new AppError('Duplicate field value', 400);
  }
  if (err.code === 'P2025') {
    error = new AppError('Record not found', 404);
  }

  res.status(error.statusCode || 500).json({
    status: 'error',
    message: error.message || 'Something went wrong',
  });
};