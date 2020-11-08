import express, { Router } from 'express';
import { jwtMiddleware } from '../../config/middlewares/jwt.middleware';
import courseController from '../../controllers/course.controller';

const router: Router = express.Router();

router.route('/courses').get(jwtMiddleware(), courseController.index);

export default router;
