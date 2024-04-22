import mysql from 'mysql2/promise'
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

interface Covers {
  albumId?: number
  pictureId?: string
  backgroundColor: string
  fontColor: string
}

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'photobookdb'
}

const connection = await mysql.createConnection(DEFAULT_CONFIG)

export class CoversModel {
  static async create ({ albumId, pictureId, backgroundColor, fontColor }: Covers): Promise<ResultSetHeader> {
    try {
      const [result] = await connection.query<ResultSetHeader>(
        'INSERT INTO AlbumCovers (album_id, picture_id, background_color, font_color) VALUES (?, ?, ?, ?);',
        [albumId, pictureId, backgroundColor, fontColor]
      )
      return result
    } catch (error) {
      console.error(error)
      throw new Error('Error creating cover')
    }
  }

  static async getByAlbumId ({ albumId }: { albumId: number }): Promise<Covers | null> {
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT album_id, title, author, background_color, font_color, img_path FROM AlbumCovers 
      INNER JOIN Pictures ON Pictures.id = AlbumCovers.picture_id 
      INNER JOIN Albums ON Albums.id = AlbumCovers.album_id
      WHERE album_id = ?;`,
      [albumId]
    )
    const covers: Covers[] = rows.map((row: RowDataPacket) => {
      return {
        albumId: row.album_id,
        title: row.title,
        author: row.author,
        imgPath: row.img_path,
        backgroundColor: row.background_color,
        fontColor: row.font_color
      }
    })
    if (covers.length === 0) return null
    return covers[0]
  }

  static async updateImage ({ albumId, imgPath }: { albumId: number, imgPath: string }): Promise<void> {
    try {
      const [result] = await connection.query<ResultSetHeader>(
        'INSERT INTO Pictures (img_path) VALUES (?);',
        [imgPath]
      )
      const pictureId = result.insertId
      console.log('Picture ID:', pictureId)

      await connection.query<ResultSetHeader>(
        'UPDATE AlbumCovers SET picture_id = ? WHERE album_id = ?;',
        [pictureId, albumId]
      )
    } catch (error) {
      console.error(error)
      throw new Error('Error updating cover image')
    }
  }

  static async update ({ albumId, pictureId, backgroundColor, fontColor }: Covers): Promise<ResultSetHeader> {
    let sqlString = 'UPDATE AlbumCovers SET '
    const clausules = []
    const values = []
    if (pictureId !== undefined) {
      clausules.push('picture_id = ?')
      values.push(pictureId)
    }

    if (backgroundColor !== undefined) {
      clausules.push('background_color = ?')
      values.push(backgroundColor)
    }

    if (fontColor !== undefined) {
      clausules.push('font_color = ?')
      values.push(fontColor)
    }

    const clausulesString = clausules.join(', ')
    sqlString += clausulesString + ' WHERE album_id = ?;'
    values.push(albumId)

    try {
      const [result] = await connection.query<ResultSetHeader>(
        sqlString,
        values
      )
      return result
    } catch (error) {
      console.error(error)
      throw new Error('Error updating cover')
    }
  }

  static async delete ({ albumId }: { albumId: number }): Promise<ResultSetHeader> {
    try {
      const [result] = await connection.query<ResultSetHeader>(
        'DELETE FROM AlbumCovers WHERE album_id = ?;',
        [albumId]
      )
      return result
    } catch (error) {
      console.error(error)
      throw new Error('Error deleting cover')
    }
  }
}
