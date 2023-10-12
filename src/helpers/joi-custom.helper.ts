import Joi from "joi";
import { Types } from "mongoose";

export const JoiUrlEndpoint = () => Joi.string().custom((value: string, helpers) => 
  {
    if (value.includes('://'))
        return helpers.error('any.invalid');
    
    return value;
  }, 'Url Endpoint Validation');

  export const JoiObjectId = () => Joi.string().custom((value: string, helpers) => {
    if (!Types.ObjectId.isValid(value))
        return helpers.error('any.invalid');

    return value;
  }, 'Object Id Validation');


