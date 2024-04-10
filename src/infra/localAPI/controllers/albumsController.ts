import type { Request, Response } from "express";
import { AlbumsModel } from "@infra/localAPI/models/mysql/albums";


export class AlbumController {

    static async getAlbums(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.body.user_id;
            const albums = await AlbumsModel.getAll( { userId });
            res.json(albums);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch albums", details: err });
        }
    }

    static async getAlbum(req: Request, res: Response): Promise<void> {
        const { albumId } = req.params;
        try {
            const album = await AlbumsModel.getById({ albumId: parseInt(albumId)});
            res.json(album);
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch album", details: err });
        }
    }

    static async createAlbum(req: Request, res: Response): Promise<void> {
        // try {
        //     await AlbumsModel.create( req.body );
        //     res.json({ success: true });
        // } catch (err) {
        //     res.status(500).json({ error: "Failed to create album", details: err });
        // }
        const title = req.body.title;
        const author = req.body.author;
        const description = req.body.description;
        const userId = req.body.userId;
    console.log(req.body);
    await AlbumsModel.create( { title, author, description, userId } );
    }

    static async updateAlbum(req: Request, res: Response): Promise<void> {
        const { albumId } = req.params;
        const id = parseInt(albumId);
        const title = req.body.title;
        const author = req.body.author;
        const description = req.body.description;

        // Construct an object with non-empty properties
        const albumData: { id: number; title?: string; author?: string; description?: string } = {
            id,
        };

        if (title === undefined && author === undefined && description === undefined) {
            res.status(400).json({ error: "No album data to update provided. At least one of title, author or description must be added in the body" });
            return;
        }
        // Add title, author, and description to the albumData object if they are present
        if (title !== undefined) {
            albumData.title = title;
        }
        if (author !== undefined) {
            albumData.author = author;
        }
        if (description !== undefined) {
            albumData.description = description;
        }

        await AlbumsModel.update({ id, title, author, description });
        // try {
        //     await AlbumsModel.update({ id: parseInt(albumId), title, author, description });
        //     res.json({ success: true });
        // } catch (err) {
        //     res.status(500).json({ error: "Failed to update album", details: err });
        // }
    }
}