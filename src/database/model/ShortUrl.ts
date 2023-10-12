import mongoose, { Schema, Types, model } from "mongoose";

export const DOCUMENT_NAME = 'ShortUrl';
export const COLLECTION_NAME = 'shortUrls';

export default interface ShortUrl {
    _id: Types.ObjectId;
    originalUrl: string;
    shortUrl: string;
    totalClick: number;
    createdAt: Date;
};


const shortUrlSchema = new mongoose.Schema<ShortUrl>(
    {
        originalUrl: {
            type: Schema.Types.String,
            required: true,
            maxlength: 500,
            trim: true, //remove the spaces
        },
        shortUrl: {
            type: Schema.Types.String,
            required: true,
        },
        totalClick: {
            type: Number,
            required: true,
            default: 0 
        },
        createdAt: {
            type: Date,
            required: true,
            select: false
        }
    }
);

//A sort order of 1 sorts values in ascending order
//A sort order of -1 sorts values in descending order
shortUrlSchema.index({shortUrl: 1});
shortUrlSchema.index({originalUrl: 1});

export const ShortUrlModel = model<ShortUrl>(DOCUMENT_NAME, shortUrlSchema, COLLECTION_NAME);

