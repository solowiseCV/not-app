import { Document,Types }  from "mongoose";
import { ICategory } from "./category.interface";

export interface INote extends Document {
     title: String;
     content: String;
     type: String;
     category: Types.ObjectId | ICategory;
     createdAt: Date;
     updatedAt: Date;
     user: Types.ObjectId;
}
