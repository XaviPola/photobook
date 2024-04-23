import mysql from 'mysql2/promise'
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise'

export interface Picture {
  id?: number
  albumId: number
  path: string
  title?: string
  description?: string
  orderInAlbum: number
}

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'photobookdb'
}

const picturesConnection = await mysql.createConnection(DEFAULT_CONFIG)

export class PicturesModel {
  static async getAll (albumId: number): Promise<Picture[] | null> {
    const [rows] = await picturesConnection.query<RowDataPacket[]>(
      `SELECT P.id, P.img_path AS path, AP.title, AP.description, AP.order_in_album AS orderInAlbum
      FROM Pictures AS P
      INNER JOIN AlbumPictures AS AP ON P.id = AP.picture_id
      WHERE AP.album_id = ?;`,
      [albumId]
    )

    const pictures: Picture[] = rows.map((row: RowDataPacket) => {
      return {
        id: row.id,
        albumId,
        path: row.path,
        title: row.title,
        description: row.description,
        orderInAlbum: row.orderInAlbum
      }
    })

    return pictures.length > 0 ? pictures : null
  }

  static async create ({ imgPath, albumId }: { imgPath: string, albumId: number }): Promise<void> {
    try {
      const [result] = await picturesConnection.query<ResultSetHeader>(
        'INSERT INTO Pictures (img_path) VALUES (?);',
        [imgPath]
      )

      const pictureId = result.insertId
      console.log('Picture ID:', pictureId)

      await picturesConnection.query<ResultSetHeader>(
        'INSERT INTO AlbumPictures (album_id, picture_id, order_in_album) VALUES (?, ?, 0);',
        [albumId, pictureId]
      )
    } catch (e) {
      throw new Error('Error posting pictures to album')
    }
  }

  static async update (pictureId: number, newPath: string): Promise<void> {
    try {
      await picturesConnection.query<ResultSetHeader>(
        `UPDATE Pictures
          SET img_path = ?
          WHERE id = ?;`,
        [newPath, pictureId]
      )
    } catch (e) {
      throw new Error('Error updating picture')
    }
  }
}
