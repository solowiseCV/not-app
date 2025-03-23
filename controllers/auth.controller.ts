import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { LoginCredentials, RegisterCredentials } from '../interfaces/auth.interface';
import NoteServices from '../services/service';
import { generateToken } from '../services/auth.service';
import User from '../models/user.model';

export const login = async (req: Request<{}, {}, LoginCredentials>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await NoteServices.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Return user info without password and token
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const register = async (req: Request<{}, {}, RegisterCredentials>, res: Response): Promise<void> => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    const token = generateToken(user);
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; 