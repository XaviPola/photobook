import type { Request, Response } from 'express'
import { CoversModel } from '@infra/localAPI/models/mysql/covers'
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

export class CoversController {
  static async createCover (req: Request, res: Response): Promise<void> {
    try {
      const albumId = parseInt(req.params.albumId)
      const backgroundColor = req.body.backgroundColor
      const fontColor = req.body.fontColor
      await CoversModel.create({ albumId, backgroundColor, fontColor })
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: 'Failed to create cover', details: err })
    }
  }

  static async getCover (req: Request, res: Response): Promise<void> {
    const { albumId } = req.params
    try {
      const cover = await CoversModel.getByAlbumId({ albumId: parseInt(albumId) })
      res.json(cover)
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch cover', details: err })
    }
  }

  static async getAllCovers (req: Request, res: Response): Promise<void> {
    const { userId } = req.params
    try {
      const covers = await CoversModel.getAll({ userId: parseInt(userId) })
      res.json(covers)
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch covers', details: err })
    }
  }

  static async updateImageCover (req: Request, res: Response): Promise<void> {
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

      CoversModel.updateImage({ albumId: parseInt(albumId), imgPath }).then(() => {
        res.status(200).json({ message: 'Cover image updated successfully' })
      }).catch((error) => {
        res.status(500).json({ message: (error as Error).message })
      }
      )
    }
    )
  }

  static async updateCoverColors (req: Request, res: Response): Promise<void> {
    const { albumId } = req.params
    const backgroundColor = req.body.backgroundColor
    const fontColor = req.body.fontColor

    if (backgroundColor === undefined && fontColor === undefined) {
      res.status(400).json({ error: 'No cover data to update provided. At least one of backgroundColor or fontColor must be added in the body' })
      return
    }

    try {
      await CoversModel.update({ albumId: parseInt(albumId), pictureId: undefined, backgroundColor, fontColor })
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: 'Failed to update cover', details: err })
    }
  }
}
