import pg from 'pg';
import env from 'dotenv';

env.config();

const db = new pg.Client({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect();

export default db;