import mysql from 'mysql2/promise'
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

interface Album {
  id?: number
  title?: string
  author?: string
  description?: string
}

interface AlbumAndCover extends Album {
  imgPath?: string
  backgroundColor?: string
  fontColor?: string
}

interface AlbumAbout extends Album {
  imgPath?: string
  aboutAuthor?: string
  backgroundColor?: string
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
  static async getAllWithCover ({ userId }: { userId: number }): Promise<AlbumAndCover[] | null> {
    if (userId !== 0) {
      const [rows] = await albumsConnection.query<RowDataPacket[]>(
        `SELECT Albums.id, title, author, description, user_id, img_path, background_color, font_color 
        FROM Albums 
        LEFT JOIN AlbumCovers ON Albums.id = AlbumCovers.album_id 
        LEFT JOIN Pictures ON AlbumCovers.picture_id = Pictures.id
        WHERE user_id = ?;`,
        [userId]
      )
      console.log(userId)
      console.log(rows)

      const albumsAndCovers: AlbumAndCover[] = rows.map((row: RowDataPacket) => {
        return {
          id: row.id,
          title: row.title,
          author: row.author,
          description: row.description,
          backgroundColor: row.background_color,
          fontColor: row.font_color,
          imgPath: row.img_path
        }
      })

      if (albumsAndCovers.length === 0) return null
      return albumsAndCovers
    }
    return null
  }

  static async getAbout ({ albumId }: { albumId: number }): Promise<AlbumAbout | null> {
    if (albumId > 0) {
      const [rows] = await albumsConnection.query<RowDataPacket[]>(
        `SELECT Albums.id, title, author, description, img_path, about_author, background_color
        FROM Albums 
        LEFT JOIN About ON Albums.id = About.album_id 
        LEFT JOIN Pictures ON About.author_picture_id = Pictures.id 
        LEFT JOIN AlbumCovers ON Albums.id = AlbumCovers.album_id
        WHERE Albums.id = ?;`,
        [albumId]
      )

      if (rows.length === 0) return null

      const albumAbout: AlbumAbout = {
        id: rows[0].id,
        title: rows[0].title,
        author: rows[0].author,
        description: rows[0].description,
        imgPath: rows[0].img_path,
        aboutAuthor: rows[0].about_author,
        backgroundColor: rows[0].background_color
      }

      return albumAbout
    }
    return null
  }

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
  }): Promise<number> {
    try {
      const results = await albumsConnection.query<ResultSetHeader>(
        `INSERT INTO Albums (title, author, description, user_id)
          VALUES (?, ?, ?, ?);`,
        [title, author, description, userId]
      )
      return results[0].insertId
    } catch (e) {
      throw new Error('Error creating Album')
    }
  }

  static async delete ({ id }: { id: number }): Promise<void> {
    try {
      await albumsConnection.query(
        'DELETE FROM AlbumPictures WHERE album_id = ?;',
        [id]
      )
    } catch (e) {
      throw new Error('Error deleting album pictures')
    }

    try {
      await albumsConnection.query(
        'DELETE FROM AlbumCovers WHERE album_id = ?;',
        [id]
      )
    } catch (e) {
      throw new Error('Error deleting album cover')
    }

    try {
      await albumsConnection.query(
        'DELETE FROM About WHERE album_id = ?;',
        [id]
      )
    } catch (e) {
      throw new Error('Error deleting album about')
    }

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

  static async updateAuthorImage ({ albumId, imgPath }: { albumId: number, imgPath: string }): Promise<void> {
    try {
      const [result] = await albumsConnection.query<ResultSetHeader>(
        'INSERT INTO Pictures (img_path) VALUES (?);',
        [imgPath]
      )
      const pictureId = result.insertId
      console.log('Picture ID:', pictureId)
      console.log('Img Path:', imgPath)

      await albumsConnection.query<ResultSetHeader>(
        'UPDATE About SET author_picture_id = ? WHERE album_id = ?;',
        [pictureId, albumId]
      )
    } catch (error) {
      console.error(error)
      throw new Error('Error updating cover image')
    }
  }

  static async updateAbout ({ albumId, aboutAuthor }: {
    albumId: number
    aboutAuthor: string
  }): Promise<void> {
    try {
      await albumsConnection.query<ResultSetHeader>(
        'UPDATE About SET about_author = ? WHERE album_id = ?;',
        [aboutAuthor, albumId]
      )
      console.log('About Author updated successfully')
      console.log('About Author:', aboutAuthor)
    } catch (e) {
      console.error(e)
      throw new Error('Error updating About')
    }
  }

  static async createAbout ({ albumId }: {
    albumId: number
  }): Promise<void> {
    try {
      await albumsConnection.query<ResultSetHeader>(
        'INSERT INTO About (album_id) VALUES (?);',
        [albumId]
      )
    } catch (e) {
      throw new Error('Error creating About')
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
