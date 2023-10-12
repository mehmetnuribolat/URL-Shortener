import express, { Request, Response, NextFunction} from 'express';
import { environment } from './configuration/config';
import routes from './routes';
import { ApiError, ErrorType, InternalError, NotFoundError } from './core/ApiError';
import Logger from './core/Logger';
import cors from 'cors';
import './database'; // initialize database

//handle all uncaught Exception
process.on('uncaughtException', (e: Error) => 
{
    Logger.error(e);
});

//Initialize express application
const app = express();

app.use(cors());

//Json Body Parser
app.use(express.json());

//Routes
app.use('/', routes);

// If 404 forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

//Error Handler Middleware
app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
    if(err instanceof ApiError) {
        ApiError.handle(err, res);

        if(err.type === ErrorType.INTERNAL) {
            Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    } 
    else {
        Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        Logger.error(err);

        if (environment === 'development') {
            return res.status(500).send(err);
        }

        ApiError.handle(new InternalError(), res);
    }
});

export default app;
