import { Request, Response, NextFunction } from 'express';
import Note from "./noteModel";
import constants from "./constants";
import mongoose from "mongoose";

class Controller {
    async getAllNotes() {
        return await Note.find({}, "-__v");
    }

    async addNote(data: any) {
        return await Note.create(data);
    }

    async getNoteById(id: string) {
        return await Note.findOne({ _id: id });
    }

    async editNoteById(id: string, data: any) {
        return await Note.findOneAndUpdate(
            { _id: id }, 
            data, 
            { new: true, runValidators: true }
        );
    }

    async deleteNoteById(id:string) {
       
        return await Note.findOneAndDelete({ _id: id });
    }
}

export default new Controller();