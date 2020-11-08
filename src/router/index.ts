import express from 'express';
import { authenticationRoutes, courseRoutes, offerRoutes, userRoutes } from './routes';

const BASE_PATH = '/api';

class Router {
    public load(app: express.Application): void {
        app.use(BASE_PATH, authenticationRoutes);
        app.use(BASE_PATH, courseRoutes);
        app.use(BASE_PATH, offerRoutes);
        app.use(BASE_PATH, userRoutes);
    }
}

export default new Router();
