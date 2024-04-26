import express from 'express'
import { AlbumController } from '../controllers/albumsController'

const router = express.Router()
router.get('/', AlbumController.getAlbums)
router.get('/:albumId', AlbumController.getAlbum)
router.get('/covers/user/:userId', AlbumController.getAlbumsCovers)
router.get('/about/:albumId', AlbumController.getAbout)
router.post('/', AlbumController.createAlbum)
router.put('/:albumId', AlbumController.updateAlbum)
router.put('/about/:albumId', AlbumController.updateAboutAuthor)
router.patch('/:albumId', AlbumController.updatePicture)
router.patch('/:albumId/author/image', AlbumController.uploadAuthorImage)
router.delete('/:albumId/picture/:pictureId', AlbumController.deletePicture)
router.delete('/:albumId', AlbumController.deleteAlbum)

export default router
