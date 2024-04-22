import mysql from 'mysql2/promise'
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

interface Album {
  id?: number
  title?: string
  author?: string
  description?: string
  userId?: number
}

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'photobookdb'
}

const albumsConnection = await mysql.createConnection(DEFAULT_CONFIG)

export class AlbumsModel {
  static async getAll ({ userId }: { userId: number }): Promise<Album[] | null> {
    if (userId !== 0) {
      const [rows] = await albumsConnection.query<RowDataPacket[]>(
        `SELECT id, title, author, description, user_id 
        FROM Albums 
        WHERE user_id = ?;`,
        [userId]
      )

      const albums: Album[] = rows.map((row: RowDataPacket) => {
        return {
          id: row.id,
          title: row.title,
          author: row.author,
          description: row.description
        }
      })

      if (albums.length === 0) return null

      return albums
    }
    return null
  }

  static async getById ({ albumId }: { albumId: number }): Promise<Album | null> {
    const [rows] = await albumsConnection.query<RowDataPacket[]>(
      'SELECT * FROM Albums WHERE id = ?;',
      [albumId]
    )
    const albums: Album[] = rows.map((row: RowDataPacket) => {
      return {
        id: row.id,
        title: row.title,
        author: row.author,
        description: row.description
      }
    })

    if (albums.length === 0) return null

    return albums[0]
  }

  static async create ({ title, userId, description, author }: {
    title: string
    userId: number
    description?: string
    author?: string
  }): Promise<void> {
    try {
      await albumsConnection.query<ResultSetHeader>(
        `INSERT INTO Albums (title, author, description, user_id)
          VALUES (?, ?, ?, ?);`,
        [title, author, description, userId]
      )
    } catch (e) {
      throw new Error('Error creating Album')
    }
  }

  static async delete ({ id }: { id: number }): Promise<void> {
    try {
      await albumsConnection.query(
        'DELETE FROM Albums WHERE id = ?;',
        [id]
      )
    } catch (e) {
      throw new Error('Error deleting album')
    }
  }

  static async update ({ id, title, author, description }: {
    id: number
    title?: string
    author?: string
    description?: string
  }): Promise<void> {
    let sqlString = 'UPDATE Albums SET '
    const Clausules = []
    const queryValues = []

    if (title != null) {
      Clausules.push('title = ?')
      queryValues.push(title)
    }

    if (author != null) {
      Clausules.push('author = ?')
      queryValues.push(author)
    }

    if (description != null) {
      Clausules.push('description = ?')
      queryValues.push(description)
    }

    const clausulesString = Clausules.join(', ')
    sqlString += clausulesString + ' WHERE id = ?;'

    try {
      await albumsConnection.query<ResultSetHeader>(
        sqlString,
        [...queryValues, id]
      )
    } catch (e) {
      throw new Error('Error updating album')
    }
  }

  static updatePicture = async (albumId: number, pictureId: number, order?: number, title?: string, description?: string): Promise<void> => {
    let sqlString = 'UPDATE AlbumPictures SET '
    const clausules = []
    const queryValues = []

    if (order != null) {
      clausules.push('order_in_album = ?')
      queryValues.push(order)
    }

    if (title != null) {
      clausules.push('title = ?')
      queryValues.push(title)
    }

    if (description != null) {
      clausules.push('description = ?')
      queryValues.push(description)
    }

    const clausulesString = clausules.join(', ')
    sqlString += clausulesString + ' WHERE album_id = ? AND picture_id = ?;'

    try {
      await albumsConnection.query<ResultSetHeader>(
        sqlString,
        [...queryValues, albumId, pictureId]
      )
    } catch (e) {
      throw new Error('Error updating album picture')
    }
  }

  static async deletePicture ({ albumId, pictureId }: { albumId: number, pictureId: number }): Promise<void> {
    try {
      await albumsConnection.query<ResultSetHeader>(
        'DELETE FROM AlbumPictures WHERE picture_id = ? AND album_id = ?;',
        [pictureId, albumId]
      )
      await albumsConnection.query('DELETE FROM Pictures WHERE id = ?', [pictureId])
    } catch (e) {
      throw new Error('Error deleting album picture:', (e as Error))
    };
  }
}
