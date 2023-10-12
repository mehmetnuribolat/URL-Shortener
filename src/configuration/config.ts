export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const base_url = process.env.BASE_URL;

export const db = {
    mongo_db_uri : process.env.MONGO_DB_URI || '',
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
};

export const logDirectory = process.env.LOG_DIR;
