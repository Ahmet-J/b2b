// import { User } from '@prisma/client';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: User;
//     }
//   }
// }


// src/types/express.d.ts

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email?: string;
        name?: string;
        role?: string;
      };
    }
  }
}

export {};