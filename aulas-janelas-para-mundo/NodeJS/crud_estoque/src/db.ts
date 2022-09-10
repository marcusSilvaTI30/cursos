import { Pool } from 'pg';

const bdConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'estoque',
    password: '325457',
    port: 5432,
};

const connectionString = 'postgres://postgres:325457@localhost:5432/estoque';

const db = new Pool({ connectionString });

export default db;
