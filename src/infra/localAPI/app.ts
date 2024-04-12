import express from 'express';
import type {Application} from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import picturesRouter from './routes/picturesRouter.js';
import albumsRouter from './routes/albumsRouter.js';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT ?? 1234;

app.disable('x-powered-by');
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:4321'
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4321');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/pictures', picturesRouter);
app.use('/albums', albumsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
