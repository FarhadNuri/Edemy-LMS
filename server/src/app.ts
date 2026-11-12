import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env';
import { routes } from './routes';
import { notFoundHandler } from './middlewares/notFoundMiddleware';
import { errorHandler } from './middlewares/errorMiddleware';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

