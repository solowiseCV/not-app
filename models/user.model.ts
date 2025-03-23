import {model, Schema, Document,Types }  from "mongoose";
import constants from "../constants";
import { IUser } from "../interfaces/auth.interface";

const UserSchema = new Schema <IUser> (
    {
         name:{
            type: String,
            required:true,
        },
        email:{
            type:String,
            required:[true,'Please input your email'],
        },
       phone:{
            type:Number,
            required:[true,'Please input your phone number'],
        },
       password:{
            type:String,
            required:[true,' input your password'],
        }
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>('User', UserSchema);

export default User;