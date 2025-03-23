import { Router } from "express";
import Controller from "../controllers/controller";
import { validateNote, validateCategory } from "../middleware/validation.middleware";
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Protect all note routes
router.use(authenticate);

router.get("/", Controller.fetch);
router.get("/notes", Controller.fetchMany);
router.post("/notes",authenticate , validateNote, Controller.create);
router.get("/notes/:id", Controller.fetchOne);
router.patch("/notes/:id",authenticate , validateNote, Controller.update);
router.delete("/notes/:id", Controller.delete);
router.post("/notes/categories",authenticate , validateCategory, Controller.createCategory);
router.get("/notes/categories/:categoryId", Controller.getNotesByCategory);
router.put("/notes/:id", authenticate , validateNote, Controller.updateNote);

export default router; 


