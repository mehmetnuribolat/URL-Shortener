import Joi from 'joi';
import { JoiUrlEndpoint } from '../../helpers/joi-custom.helper';

export default {
    resolveUrl: Joi.object().keys({
        url: JoiUrlEndpoint().required().max(200)
    }),
    createShortUrl: Joi.object().keys({
        originalUrl: JoiUrlEndpoint().required().max(500)
    })
}