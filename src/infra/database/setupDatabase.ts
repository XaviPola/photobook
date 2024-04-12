import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'photobookdb'
};

const connection = await mysql.createConnection(DEFAULT_CONFIG);

try {
  await connection.connect();
  console.log('Connected to MySQL server');
  await executeSQLScript('src/infra/database/mysql/create_db_and_tables.sql');
  console.log('Database and tables created successfully');
} catch (err) {
  console.error('Error during DB setup', err);
} finally {
  await connection.end();
}

async function executeSQLScript(scriptPath: string) {
  const absolutePath = path.join(process.cwd(), scriptPath);
  console.log('Executing SQL script:', absolutePath);
  const sql = fs.readFileSync(absolutePath, 'utf-8');
  const queries = sql.split(';').filter((query) => query.trim() !== '');
  queries.map(sql => connection.query(sql));
};