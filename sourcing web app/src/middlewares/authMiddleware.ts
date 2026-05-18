// import { Request, Response, NextFunction } from 'express';
// import { PrismaClient } from '@prisma/client';
// import { AppError } from '../utils/AppError';
// import { verifyToken } from '../utils/jwt';

// const prisma = new PrismaClient();

// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//   let token;
//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return next(new AppError('You are not logged in. Please log in to access.', 401));
//   }

//   try {
//     const decoded = verifyToken(token) as unknown as { id: string };
//     const user = await prisma.user.findUnique({ where: { id: Number(decoded.id) } });
//     if (!user) {
//       return next(new AppError('The user belonging to this token no longer exists.', 401));
//     }
//     (req as any).user = user;
//     next();
//   } catch (err) {
//     return next(new AppError('Invalid token. Please log in again.', 401));
//   }
// };

// export const restrictTo = (...roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = (req as any).user;
//     if (!user || !roles.includes(user.role)) {
//       return next(new AppError('You do not have permission to perform this action', 403));
//     }
//     next();
//   };
// };