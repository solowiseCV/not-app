// middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { RegisterCredentials, LoginCredentials } from '../interfaces/auth.interface';

export const validateRegister = (req: Request<{}, {}, RegisterCredentials>, res: Response, next: NextFunction): void => {
  const { name, email, password, phone } = req.body;
  
  if (!name || !email || !password || !phone) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters' });
    return;
  }
  
  if (!email.includes('@')) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }
  
  next();
};

export const validateLogin = (req: Request<{}, {}, LoginCredentials>, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  next();
};