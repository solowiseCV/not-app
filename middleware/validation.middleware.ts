import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
// import { INote } from "../models/noteModel";
import { registerSchema, loginSchema, noteSchema, categorySchema } from './validation.schema';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export const validateNote = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = noteSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export const validateCategory = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};