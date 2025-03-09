import {model, Schema, Document }  from "mongoose";
import constants from "./constants";
// import { NOTE_TYPES, DATABASES} from constants;

export interface INote extends Document {
     tittle: string,
     content: string,
     type: string,
     createdAt: Date,
     updatedAt: Date,
}

const NoteSchema = new Schema <INote> (
    {
        tittle:{
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
    },
    {
        timestamps: true,
    }
);

const Note = model<INote>(constants.DATABASES.NOTE, NoteSchema);

export default Note;