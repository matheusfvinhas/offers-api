import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../../swagger.json';
import router from '../../router';

const corsOptions: CorsOptions = {
    methods: 'GET,PUT,POST,DELETE',
    optionsSuccessStatus: 204,
    origin: process.env.ORIGIN_URL,
};

const morganLogType: string = process.env.NODE_ENV !== 'production' ? 'short' : 'tiny';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(helmet());
        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan(morganLogType));

        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        router.load(this.app);
    }

    public listen(): void {
        const port = Number(process.env.PORT || 5000);
        this.app.listen(port, () => {
            console.log(`[SERVER] Running at http://localhost:${port}`);
        });
    }
}

export default new Server();
