import express, { Router } from 'express';
import { jwtMiddleware } from '../../config/middlewares/jwt.middleware';
import offerController from '../../controllers/offer.controller';

const router: Router = express.Router();

router.route('/offers').get(jwtMiddleware(), offerController.index);

export default router;
