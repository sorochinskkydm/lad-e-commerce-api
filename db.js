import Pg from 'pg';
const Pool = Pg.Pool;

export const pool = new Pool({
  user: 'postgres',
  password: 'BrosGriefy1998',
  host: 'localhost',
  port: 5432,
  database: 'node_postgres',
});
