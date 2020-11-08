import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

export const jwtMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const token = req.headers['x-access-token'] as string;
        if (!token) {
            res.status(403).json('Token não fornecido.');
            return;
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET as Secret);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(403).json('Token expirado.');
                return;
            }

            res.status(403).json('Token inválido.');
            return;
        }

        next();
    };
};
