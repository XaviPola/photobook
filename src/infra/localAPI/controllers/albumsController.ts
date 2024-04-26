import type { Request, Response } from 'express'
import { AlbumsModel } from '@infra/localAPI/models/mysql/albums'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage }).single('image')

export class AlbumController {
  static async getAlbums (req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.user_id
      const albums = await AlbumsModel.getAll({ userId })
      res.json(albums)
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch albums', details: err })
    }
  }

  static async getAlbumsCovers (req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params
      const albums = await AlbumsModel.getAllWithCover({ userId: parseInt(userId) })
      res.json(albums)
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch albums', details: err })
    }
  }

  static async getAlbum (req: Request, res: Response): Promise<void> {
    const { albumId } = req.params
    try {
      const album = await AlbumsModel.getById({ albumId: parseInt(albumId) })
      res.json(album)
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch album', details: err })
    }
  }

  static async createAlbum (req: Request, res: Response): Promise<void> {
    try {
      const title = req.body.title
      const author = req.body.author
      const description = req.body.description
      const userId = req.body.userId
      const albumId = await AlbumsModel.create({ title, author, description, userId })
      await AlbumsModel.createAbout({ albumId })
      res.json({ success: true, albumId })
    } catch (err) {
      res.status(500).json({ error: 'Failed to create album', details: err })
    }
  }

  static async updateAlbum (req: Request, res: Response): Promise<void> {
    const { albumId } = req.params
    const id = parseInt(albumId)
    const title = req.body.title
    const author = req.body.author
    const description = req.body.description

    if (title === undefined && author === undefined && description === undefined) {
      res.status(400).json({ error: 'No album data to update provided. At least one of title, author or description must be added in the body' })
      return
    }

    await AlbumsModel.update({ id, title, author, description })
    try {
      await AlbumsModel.update({ id, title, author, description })
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: 'Failed to update album', details: err })
    }
  }

  static async updatePicture (req: Request, res: Response): Promise<void> {
    const { albumId } = req.params
    const pictureId = req.body.id
    const order = req.body.orderInAlbum
    const title = req.body.title
    const description = req.body.description

    if (order === undefined && title === undefined && description === undefined) {
      res.status(400).json({ error: 'No picture data to update provided. At least one of order, title or description must be added in the body' })
      return
    }
    try {
      await AlbumsModel.updatePicture(parseInt(albumId), pictureId, order, title, description)
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: 'Failed to update picture', details: err })
    }
  }

  static async updateAboutAuthor (req: Request, res: Response): Promise<void> {
    const { albumId } = req.params
    const aboutAuthor = req.body.aboutAuthor
    try {
      await AlbumsModel.updateAbout({ albumId: parseInt(albumId), aboutAuthor })
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: 'Failed to update about author', details: err })
    }
  }

  static async uploadAuthorImage (req: Request, res: Response): Promise<void> {
    upload(req, res, (err): void => {
      if (err !== undefined && err !== null) {
        res.status(500).json({ message: (err).message })
        return
      }
      if (req.file === undefined || req.file === null) {
        res.status(400).send('No file uploaded')
        return
      }
      const { albumId } = req.params
      const imgPath = path.join('uploads', req.file.filename)

      console.log('Img Path:', imgPath)
      console.log('Album Id:', albumId)

      AlbumsModel.updateAuthorImage({ albumId: parseInt(albumId), imgPath }).then(() => {
        res.status(200).json({ success: true, message: 'Author Image updated successfully' })
      }).catch((error) => {
        res.status(500).json({ error: 'Failed to upload author image', message: (error as Error).message })
      }
      )
    }
    )
  }

  static async getAbout (req: Request, res: Response): Promise<void> {
    const { albumId } = req.params
    try {
      const about = await AlbumsModel.getAbout({ albumId: parseInt(albumId) })
      res.json(about)
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch about', details: err })
    }
  }

  static async deleteAlbum (req: Request, res: Response): Promise<void> {
    const { albumId } = req.params
    try {
      const aid = parseInt(albumId)
      await AlbumsModel.delete({ id: aid })
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete album', details: err })
    }
  }

  static async deletePicture (req: Request, res: Response): Promise<void> {
    const { albumId, pictureId } = req.params
    try {
      await AlbumsModel.deletePicture({ albumId: parseInt(albumId), pictureId: parseInt(pictureId) })
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete picture', details: err })
    }
  }
}
