import express, { Router } from 'express';
import authenticationController from '../../controllers/auth.controller';

const router: Router = express.Router();

router.route('/authenticate').post(authenticationController.authenticate);

export default router;
