import { Request, Response } from "express";
import { Types } from "mongoose"; 
import NoteServices from "../services/service";
import constants from "../constants"; 
import { INote } from "../interfaces/note.interface";
import { Category } from "../models/category.model";

interface TypedRequest<T> extends Request {
  body: T
}

interface UpdateNoteRequest {
  title?: string;
  content?: string;
  category?: Types.ObjectId;
  type?: string;
}

interface CreateCategoryRequest {
  name: string;
  description?: string;
}

class Controller {
  // Fetch home
  async fetch(req: Request, res: Response) {
    res.status(200).send({ message: constants.MESSAGES.FETCHED, success: true });
  }

  // Fetch all notes
  async fetchMany(req: Request, res: Response) {
    try {
      const notes = await NoteServices.getAllNotes(req.user!.userId);
      res.status(200).send({
        message: constants.MESSAGES.FETCHED,
        success: true,
        data: notes,
      });
    } catch (err: any) {
      res.status(500).send({
        message: err.message || constants.MESSAGES.ERROR,
        success: false,
      });
    }
  }

  // Create note
  async create(req: Request, res: Response) {
    try {
      const data = await NoteServices.addNote(req.body, req.user!.userId);
      res.status(201).send({
        message: constants.MESSAGES.CREATED,
        success: true,
        data,
      });
    } catch (err: any) {
      res.status(500).send({
        message: err.message || constants.MESSAGES.ERROR,
        success: false,
      });
    }
  }

  // Get a note by ID
  async fetchOne(req: Request, res: Response):Promise <void>{
    try {
      const { id } = req.params;
      const data = await NoteServices.getNoteById(id, req.user!.userId);
      if (!data) {
         res
          .status(404)
          .send({ message: "Note not found", success: false });
      return
    }
      res.status(200).send({
        message: constants.MESSAGES.FETCHED,
        success: true,
        data,
       });
    } catch (err: any) {
      res.status(500).send({
        message: err.message || constants.MESSAGES.ERROR,
        success: false,
      });
    }
  }

  // Edit note
  async update(req: Request, res: Response):Promise<void>{
    try {
      const { id } = req.params;
      const data = await NoteServices.editNoteById(id, req.body, req.user!.userId);
      if (!data) {
       res
          .status(404)
          .send({ message: "Note not found", success: false });
          return
        }
      res.status(200).send({
        message: constants.MESSAGES.UPDATED,
        success: true,
        data,
      });
    } catch (err: any) {
      res.status(500).send({
        message: err.message || constants.MESSAGES.ERROR,
        success: false,
      });
    }
  }

  // Delete a note
  async delete(req: Request, res: Response) :Promise<void>{
    try {
      const { id } = req.params;
      const data = await NoteServices.deleteNoteById(id, req.user!.userId);
      if (!data) {
       res
          .status(404)
          .send({ message: "Note not found", success: false });
          return
        }
      res.status(200).send({
        message: constants.MESSAGES.DELETED,
        success: true,
        data,
      });
    } catch (err: any) {
      res.status(500).send({
        message: err.message || constants.MESSAGES.ERROR,
        success: false,
      });
    }
  }

  // Get notes by category
  async getNotesByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;
      const notes = await NoteServices.getNotesByCategory(categoryId, req.user!.userId);
      
      if (!notes || notes.length === 0) {
        res.status(404).send({
          message: "No notes found for this category",
          success: false
        });
        return;
      }

      res.status(200).send({
        message: constants.MESSAGES.FETCHED,
        success: true,
        data: notes
      });
    } catch (err: any) {
      res.status(500).send({
        message: err.message || constants.MESSAGES.ERROR,
        success: false
      });
    }
  }

  // Update note (PUT method)
  async updateNote(req: TypedRequest<UpdateNoteRequest>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: Partial<INote> = req.body;
      
      const updatedNote = await NoteServices.updateNote(id, updateData, req.user!.userId);
      
      if (!updatedNote) {
        res.status(404).send({
          message: constants.MESSAGES.NOT_FOUND,
          success: false
        });
        return;
      }

      res.status(200).send({
        message: constants.MESSAGES.UPDATED,
        success: true,
        data: updatedNote
      });
    } catch (err: any) {
      res.status(500).send({
        message: err.message || constants.MESSAGES.ERROR,
        success: false
      });
    }
  }

  // Create category
  async createCategory(req: Request<{}, {}, CreateCategoryRequest>, res: Response) {
    try {
      const { name, description } = req.body;
      const category = await Category.create({ name, description });
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Error creating category"
      });
    }
  }
}

export default new Controller();