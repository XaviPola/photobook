import express from 'express'
import { CoversController } from '../controllers/coversController'

const router = express.Router()
router.post('/:albumId', CoversController.createCover)
router.get('/:albumId', CoversController.getCover)
router.put('/:albumId', CoversController.updateCoverColors)
router.patch('/:albumId/image', CoversController.updateImageCover)

export default router
