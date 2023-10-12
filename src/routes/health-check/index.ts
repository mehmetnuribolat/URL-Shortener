import express from 'express';
import asyncHandler from '../../helpers/async-handler.helper';
import { SuccessResponse } from '../../core/ApiResponse';


const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => 
    {
        return new SuccessResponse('success', {
            message: 'App is healthy !'
        }).send(res);
    })
);

export default router;
