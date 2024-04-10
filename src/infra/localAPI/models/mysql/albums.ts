import mysql from 'mysql2/promise';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface Album {
  id?: number;
  title?: string;
  author?: string;
  description?: string;
  userId?: number;
}


const DEFAULT_CONFIG  = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'photobookdb'
}

const albumsConnection = await mysql.createConnection(DEFAULT_CONFIG);

export class AlbumsModel {

  static async getAll({ userId }: { userId: number }): Promise<Album[] | null> {
    
    if (userId) {
      const [rows] = await albumsConnection.query<RowDataPacket[]>(
        `SELECT id, title, author, description, user_id 
        FROM Albums 
        WHERE user_id = ?;`,
        [userId]
      );

      const albums: Album[] = rows.map((row: RowDataPacket) => {
        return {
          id: row.id,
          title: row.title,
          author: row.author,
          description: row.description
        };
      });

      if (albums.length === 0) return null;

      return albums;
    }
    return null;
  }

  static async getById({ albumId }: { albumId: number }): Promise<Album | null> {
    const [rows] = await albumsConnection.query<RowDataPacket[]>(
      `SELECT * FROM Albums WHERE id = ?;`,
      [albumId]
    );
    const albums: Album[] = rows.map((row: RowDataPacket) => {
      return {
        id: row.id,
        title: row.title,
        author: row.author,
        description: row.description
      };
    });

    if (albums.length === 0) return null;

    return albums[0];
  }

  static async create({ title, userId, description, author}: { 
    title: string; 
    userId: number; 
    description?: string; 
    author?: string; 
}): Promise<void> {

    try {
      await albumsConnection.query<ResultSetHeader>(
        `INSERT INTO Albums (title, author, description, user_id)
          VALUES (?, ?, ?, ?);`,
        [title, author, description, userId]
      );

    } catch (e) {
      throw new Error(`Error creating Album`);}
  }

  static async delete({ id }: { id: number }): Promise<void> {
    try {

      await albumsConnection.query(
        `DELETE FROM Albums WHERE id = ?;`,
        [id]
      );
    } catch (e) {
      throw new Error('Error deleting album');
    }
  }

  static async update({ id, title, author, description }: { 
    id: number; 
    title: string;
    author?: string;
    description?: string;
  }): Promise<void> {
    console.log(id, title, author, description)
    let sqlString = `UPDATE Albums SET `;
    let Clausules = [];
    let queryValues = [];
    
    if (title) {
      Clausules.push(`title = ?`);
      queryValues.push(title);
    }

    if (author) {
      Clausules.push(`author = ?`);
      queryValues.push(author);
    }

    if (description) {
      Clausules.push(`description = ?`);
      queryValues.push(description);
    }

    const clausulesString = Clausules.join(', ');
    sqlString += clausulesString + ` WHERE id = ?;`;
    await albumsConnection.query<ResultSetHeader>(
      sqlString,
      [...queryValues, id]
    );
    // try {
    //   await albumsConnection.query(
    //     `UPDATE Albums
    //       SET title = ?, author = ?, description = ?
    //       WHERE id = ?;`,
    //     [title, author, description, id]
    //   );
    // } catch (e) {
    //   throw new Error('Error updating album');
    // }
  }
}