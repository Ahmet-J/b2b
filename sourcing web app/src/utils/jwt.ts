import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface UserData {
  id: number;
  email: string;
  role: string;
  name: string;
  phone: string;
}

export const generateToken = (user: UserData) => {
  const payload = user;
  return jwt.sign(payload, "T8823SI_34RFVB", {
    expiresIn: "10d",
  });
};

export interface customUserRequest extends Request {
  User: UserData;
}

export const verifyToken = (
  req: customUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const Token =
      req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization?.split(" ")[1];

    // console.log(Token)

    if (!Token) {
      return res.json({
        IsSuccess: false,
        message: "Ma Login Garaysnid",
      });
    }

    const decode: UserData | any = jwt.verify(Token, "T8823SI_34RFVB");

    req.User = { ...decode };
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      IsSuccess: false,
      message: "Magaranayo Token Kan ",
    });
  }
};