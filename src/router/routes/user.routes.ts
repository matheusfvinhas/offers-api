import express, { Router } from 'express';
import { jwtMiddleware } from '../../config/middlewares/jwt.middleware';
import userController from '../../controllers/user.controller';

const router: Router = express.Router();

router.route('/users').get(jwtMiddleware(), userController.index).post(userController.create);

export default router;
