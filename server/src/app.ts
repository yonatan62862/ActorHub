import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import castRoutes from './routes/castRoutes';
import commentRoutes from './routes/commentRoutes';
import cacheRoutes from './routes/cacheRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', castRoutes);
app.use('/api', commentRoutes);
app.use('/api', cacheRoutes);

app.get('/health', (_, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

app.use(errorHandler);

export default app;
