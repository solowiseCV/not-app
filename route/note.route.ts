import { Router } from "express";
import Controller from "../controllers/controller";
import { validateNote, validateCategory } from "../middleware/validation.middleware";
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Protect all note routes
router.use(authenticate);

router.get("/", Controller.fetch);
router.get("/notes", Controller.fetchMany);
router.post("/notes", validateNote, Controller.create);
router.get("/notes/:id", Controller.fetchOne);
router.patch("/notes/:id", validateNote, Controller.update);
router.delete("/notes/:id", Controller.delete);
router.post("/notes/categories", validateCategory, Controller.createCategory);
router.get("/notes/categories/:categoryId", Controller.getNotesByCategory);
router.put("/notes/:id", validateNote, Controller.updateNote);

export default router; 


