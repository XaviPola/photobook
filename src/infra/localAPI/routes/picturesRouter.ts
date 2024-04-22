import express from 'express'
import { PictureController } from '../controllers/picturesController.js'

const router = express.Router()

router.get('/:albumId', PictureController.getAll)
router.post('/upload/:albumId', PictureController.create)
router.patch('/:albumId', PictureController.update)

export default router
