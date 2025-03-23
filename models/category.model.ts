import { ICategory } from "../interfaces/category.interface";
import {model, Schema }  from "mongoose";


const CategorySchema = new Schema<ICategory>({
    name:{
        type:String,
        required:true,
        unique: true,
    },
    description:{
        type:String,
        required:false
    }
},
{
    timestamps: true,
},
)

export const Category = model<ICategory>('Category', CategorySchema);