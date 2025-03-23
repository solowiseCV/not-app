import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    password: string;
    email: string;
    phone: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    phone: number;
  }
  
  export interface AuthResponse {
    token: string;
    user: Omit<IUser, 'password'>; // Return user without password
  }