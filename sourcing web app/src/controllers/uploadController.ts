import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

export const uploadSingle = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new Error('Ma jiro file la soo galiyay');
  res.status(200).json({
    status: 'success',
    data: { url: req.file.path, filename: req.file.filename }
  });
});

export const uploadMultiple = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) throw new Error('Ma jiraan files la soo galiyay');
  const urls = files.map(file => ({ url: file.path, filename: file.filename }));
  res.status(200).json({ status: 'success', data: { urls } });
});