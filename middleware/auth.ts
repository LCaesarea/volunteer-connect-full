import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extending the Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string;
        }
    }
}

// Middleware to authenticate the user
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.auth_token;

    if (!token) {
        res.status(401).send('Unauthorized');
        return; // Ensure the function doesn't continue after sending a response
    }

    jwt.verify(token, process.env.JWT_SECRET as Secret, (err: Error | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
            res.status(403).send('Forbidden');
            return; // Ensure the function doesn't continue after sending a response
        }

        // TypeScript now recognizes `user` on `req` because we extended the interface
        req.user = decoded;
        next(); // Move to the next middleware
    });
};

// Function to generate auth token
export const generateAuthToken = (userId: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign({ userId }, process.env.JWT_SECRET as Secret, { expiresIn: '1h' });
};
