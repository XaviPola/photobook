import type { Request, Response } from 'express'
import { PicturesModel } from '@infra/localAPI/models/mysql/pictures'
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

export class PictureController {
  static async getAll (req: Request, res: Response): Promise<void> {
    const { albumId } = req.params
    try {
      const pictures = await PicturesModel.getAll(Number(albumId))
      res.json(pictures)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  }

  static async create (req: Request, res: Response): Promise<void> {
    upload(req, res, (err) => {
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

      PicturesModel.create({
        imgPath,
        albumId: Number(albumId)
      }).then(() => {
        res.status(201).json({ message: 'Picture added successfully', imgPath })
      }).catch((error) => {
        res.status(500).json({ message: (error as Error).message })
      }
      )
    }
    )
  }

  static async update (req: Request, res: Response): Promise<void> {
    const { pictureId } = req.params
    const { newPath } = req.body
    try {
      await PicturesModel.update(Number(pictureId), newPath)
      res.status(200).json({ message: 'Picture updated successfully' })
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  }
}
