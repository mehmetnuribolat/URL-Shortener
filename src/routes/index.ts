import express, {Request, Response} from 'express';
import healthCheck from './health-check';
import urlShortener from './url-shortener';

const router = express.Router();

/*---------------------------------------------------------*/
router.use('/health-check', healthCheck);

router.use('/short-url', urlShortener)

/*---------------------------------------------------------*/

export default router;
