import {model, Schema, Document,Types }  from "mongoose";
import constants from "../constants";
import { ICategory } from "../interfaces/category.interface";
import { INote } from "../interfaces/note.interface";


const NoteSchema = new Schema <INote> (
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
            unique:true,
        },
         type:{
            type: String,
            enum:[constants.NOTE_TYPES.USER, constants.NOTE_TYPES.AGENT],
            default: constants.NOTE_TYPES.USER,
        },
        category:{
            type:Schema.Types.ObjectId,
            ref: 'category',
            required:true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const Note = model<INote>(constants.DATABASES.NOTE, NoteSchema);

export default Note;