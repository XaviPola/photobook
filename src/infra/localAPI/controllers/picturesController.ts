import type { Request, Response } from 'express';
import { PicturesModel } from '@infra/localAPI/models/mysql/pictures';
import type { Picture } from '@infra/localAPI/models/mysql/pictures';

export class PictureController {

  static async getAll(req: Request, res: Response) {
    const { albumId } = req.params;
    try {
      const pictures = await PicturesModel.getAll(Number(albumId));
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async create(req: Request, res: Response) {
    const { albumId } = req.params;
    const pictures: Picture[] = req.body.pictures;
    try {
      await PicturesModel.create(pictures.map((picture: Picture) => ({
        ...picture,
        albumId: Number(albumId)
      })));
      res.status(201).json({ message: 'Pictures added successfully' });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async update(req: Request, res: Response) {
    const { pictureId } = req.params;
    const { newPath } = req.body;
    try {
      await PicturesModel.update(Number(pictureId), newPath);
      res.status(200).json({ message: 'Picture updated successfully' });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
