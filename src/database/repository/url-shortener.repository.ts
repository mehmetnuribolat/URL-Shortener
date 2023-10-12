import ShortUrl, {ShortUrlModel} from "../model/ShortUrl";

async function getRecordByOriginalUrl(originalUrl: string) : Promise<ShortUrl | null> {
    return ShortUrlModel.findOne({
        originalUrl: originalUrl
    })
    .select('+_id +originalUrl +shortUrl +totalClick')
    .lean()
    .exec();
}

async function getRecordByShortUrl(shortUrl: string) : Promise<ShortUrl | null> {
    return ShortUrlModel.findOne({
        shortUrl: shortUrl
    })
    .select('+_id +originalUrl +shortUrl +totalClick')
    .lean()
    .exec();
}

async function findShortUrlIfExists(url: string): Promise<ShortUrl | null> {
    return ShortUrlModel.findOne({ shortUrl: url }).lean().exec();
}

async function findOriginalUrlIfExists(url: string): Promise<ShortUrl | null> {
    return ShortUrlModel.findOne({ originalUrl: url }).lean().exec();
}

async function create(shortUrl: string, originalUrl: string) : Promise<ShortUrl> 
{
    const newRecord = {
        createdAt: new Date(),
        shortUrl : shortUrl, 
        originalUrl : originalUrl,
        totalClick: 0,
    } as ShortUrl;
    
    const createdRecord = await ShortUrlModel.create(newRecord);
    return createdRecord.toObject();
}

async function update(record: ShortUrl) : Promise<ShortUrl | null> {
    return ShortUrlModel.findByIdAndUpdate(record._id, record,{ new: true })
        .lean()
        .exec();
}

export default {
    findShortUrlIfExists,
    findOriginalUrlIfExists,
    getRecordByOriginalUrl,
    getRecordByShortUrl,
    create,
    update
};