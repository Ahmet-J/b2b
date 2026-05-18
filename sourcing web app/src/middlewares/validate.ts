import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    return next(new AppError(errorMessages, 400));
  }
  next();
};

export const registerValidation = [
  body('email').isEmail().withMessage('Email sax ah geli'),
  body('password').isLength({ min: 4 }).withMessage('Password waa inuu ka yaraan 6 xaraf'),
  body('name').notEmpty().withMessage('Magaca waa qasab'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email sax ah geli'),
  body('password').notEmpty().withMessage('Password waa qasab'),
];
