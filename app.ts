import express, { Request, Response,RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import constants from "./constants";
import database from "./database";
import controller from "./controller";


const app = express();
const { MESSAGES } = constants;

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// Home route
app.get("/", (req: Request, res: Response) => {
    res.status(200).send({ message: MESSAGES.FETCHED, success: true });
});

// Fetch all notes
app.get("/api/v1/notes", async (req: Request, res: Response) => {
    try {
        const notes = await controller.getAllNotes();
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data: notes });
    } catch (err: any) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

// Create note
app.post("/api/v1/notes", async (req: Request, res: Response) => {
    try {
        const data = await controller.addNote(req.body);
        res
            .status(201)
            .send({ message: MESSAGES.CREATED, success: true, data });
    } catch (err: any) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
});

// Get a note by ID
app.get("/api/v1/notes/:id", (async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const data = await controller.getNoteById(id);
        
        if (!data) {
            return res
                .status(404)
                .send({ message: "Note not found", success: false });
        }
        
        res
            .status(200)
            .send({ message: MESSAGES.FETCHED, success: true, data });
    } catch (err: any) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
}) as RequestHandler);

// Edit note
app.patch("/api/v1/notes/:id", (async (req:Request , res:Response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const data = await controller.editNoteById(id, body);
        
        if (!data) {
            return res
                .status(404)
                .send({ message: "Note not found", success: false });
        }
        
        res
            .status(200)
            .send({ message: MESSAGES.UPDATED, success: true, data });
    } catch (err: any) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
})  as RequestHandler);

// Delete a note
app.delete("/api/v1/notes/:id", (async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const data = await controller.deleteNoteById(id);
        
        if (!data) {
            return res
                .status(404)
                .send({ message: "Note not found", success: false });
        }
        
        res
            .status(200)
            .send({ message: MESSAGES.DELETED, success: true, data });
    } catch (err: any) {
        res
            .status(500)
            .send({ message: err.message || MESSAGES.ERROR, success: false });
    }
})  as RequestHandler);

// Start server
const startServer = () => {
    app.listen(PORT, () => {
        database();
        console.log(`Server started on port: ${PORT}`);
    });
};

startServer();

export default app;