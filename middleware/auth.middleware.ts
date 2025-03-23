import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';
import { JwtPayload } from '../services/auth.service';

// Extend Express Request to include user information
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Custom type guard
export function isAuthenticatedUser(payload: any): payload is JwtPayload {
  return payload && typeof payload.userId === 'string' && typeof payload.email === 'string';
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload || !isAuthenticatedUser(payload)) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};