import express, {Request}  from 'express';
import schema from './validation-schema';
import validator, { ValidationSource } from '../../helpers/request-validator.helper';
import asyncHandler from '../../helpers/async-handler.helper';
import {  SuccessResponse } from '../../core/ApiResponse';
import { BadRequestError } from '../../core/ApiError';
import urlShortenerRepository from '../../database/repository/url-shortener.repository';
import { base_url } from '../../configuration/config';

const router = express.Router();

//Get Short Url from Database
router.get(
    '/resolve/:url',
    validator(schema.resolveUrl, ValidationSource.PARAM),
    asyncHandler(async(req: Request, res) => 
    {
        const shortUrl = req.params.url;
        const isShortUrlExists = await urlShortenerRepository.findShortUrlIfExists(shortUrl);

        if(!isShortUrlExists) {
            throw new BadRequestError('Url does not exists!');
        }
        const dataToReturn = await urlShortenerRepository.getRecordByShortUrl(shortUrl);
        return new SuccessResponse('Successfull', dataToReturn).send(res);
    }));

//Create new Short Url
router.post(
    '/create',
    validator(schema.createShortUrl),
    asyncHandler(async (req: Request, res) => 
    {
        const { originalUrl } = req.body;
        const isUrlExists = await urlShortenerRepository.findOriginalUrlIfExists(originalUrl);

        //If Url Exists return the short url on mongodb
        if(isUrlExists) 
        {
            const existRecord = await urlShortenerRepository
            .getRecordByOriginalUrl(originalUrl);

            return new SuccessResponse('Successfull', existRecord).send(res);
        }

        //Generate Short Url
        let shortUrl = Math.random().toString(36).substring(2, 8);
        shortUrl = base_url + shortUrl;

        const recordToCreate = await urlShortenerRepository.create
        (   shortUrl, originalUrl
        );

        return new SuccessResponse('Short Url Generated Successfully', recordToCreate).send(res);
    }),
);

export default router;