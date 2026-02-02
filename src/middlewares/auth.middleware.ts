import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { fdatasync } from "node:fs";

const JWT_SECRET = process.env.JWT_SECRET || "Ndoroayudestiaeka@21"

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        res.status(401).json({massage: "Authentication Required!"})
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    }   catch(error) {
        console.log(error)
        res.status(401).json({massage: "Invalid Token"})
    }
}
