import express from 'express';
import { AlbumController } from '../controllers/albumsController';


const router = express.Router();
router.get('/', AlbumController.getAlbums);
router.get('/:albumId', AlbumController.getAlbum);
router.post('/', AlbumController.createAlbum);
router.put('/:albumId', AlbumController.updateAlbum);
router.patch('/:albumId', AlbumController.updatePicture);


export default router;