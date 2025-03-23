import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './database';
import { loggingMiddleware } from './middleware/logging.Middleware';
import noteRouter from './route/note.route';
import authRouter from './route/auth.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use('/api/auth', authRouter); 
app.use('/api/v1', noteRouter);   


database()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });

export default app;