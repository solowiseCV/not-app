import { INote } from "../interfaces/note.interface";
import Note from "../models/noteModel";
import User from "../models/user.model";

class NoteServices {
    async getAllNotes(userId: string) {
        return await Note.find({ user: userId }, "-__v");
    }

    async addNote(data: any, userId: string) {
        return await Note.create({ ...data, user: userId });
    }

    async getNoteById(id: string, userId: string) {
        return await Note.findOne({ _id: id, user: userId }, "-__v");
    }

    async editNoteById(id: string, data: any, userId: string) {
        return await Note.findOneAndUpdate(
            { _id: id, user: userId },
            { $set: data },
            { new: true }
        );
    }

    async deleteNoteById(id: string, userId: string) {
        return await Note.findOneAndDelete({ _id: id, user: userId });
    }

    async getNotesByCategory(categoryId: string, userId: string) {
        return await Note.find({ category: categoryId, user: userId }, "-__v");
    }

    async updateNote(id: string, data: any, userId: string) {
        return await Note.findOneAndUpdate(
            { _id: id, user: userId },
            { $set: data },
            { new: true }
        );
    }

    async getUserByEmail(email: string) {
        return await User.findOne({ email });
    }
}

export default new NoteServices();