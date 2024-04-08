import fs from 'fs';
import express from 'express';

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4321');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

function getAlbumPicturesPath(albumName: string): string {
  return `.private/${albumName}/pictures.json`;
};

function fileExists(filePath: string): boolean {
  try {
      fs.accessSync(filePath, fs.constants.F_OK);
      return true;
  } catch (err) {
      return false;
  }
}

function loadJSONFile(path: string): any {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

app.get('/:albumName/pictures', (req, res) => {
  const { albumName } = req.params;
  const picturesFilePath = getAlbumPicturesPath(albumName);
  if (!fileExists(picturesFilePath)) {
    res.json({ pictures: [] });
    return;
  }
  res.json(loadJSONFile(picturesFilePath));
});

app.patch('/:albumName/pictures/:pictureId', (req, res) => {
  const { albumName, pictureId } = req.params;
  const { title, description, order } = req.body;
  
  const picturesFilePath = getAlbumPicturesPath(albumName);
  if (!fileExists(picturesFilePath)) {
    return res.status(404).json({ error: 'Album not found' });
  }
  let pictures = loadJSONFile(picturesFilePath);
  let parsedPictures = pictures.pictures;

  const index = parsedPictures.findIndex(picture => picture.id.toString() === pictureId);

  if (index === -1) {
    return res.status(404).json({ error: 'Picture not found' });
  }

  parsedPictures[index].title = title;
  parsedPictures[index].description = description;
  parsedPictures[index].order = order;

  pictures.pictures = parsedPictures;
  console.log('Pictures:', pictures);
  fs.writeFile(picturesFilePath, JSON.stringify(pictures, null, 2), err => {
    if (err) {
      console.error('Error writing to pictures JSON file:', err);
      return res.status(500).json({ error: 'Failed to update picture' });
    }
    res.json({ success: true, picture: parsedPictures[index] });
  });
});

app.put('/:albumName/pictures', (req, res) => {
  const { albumName } = req.params;
  const picturesFilePath = getAlbumPicturesPath(albumName);

  const updatedPictures = req.body;

  // Write the updated pictures array to the JSON file
  fs.writeFile(picturesFilePath, JSON.stringify(updatedPictures, null, 2), err => {
    if (err) {
      console.error('Error writing to pictures JSON file:', err);
      return res.status(500).json({ error: 'Failed to update pictures' });
    }
    res.json({ success: true, updatedPictures });
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
