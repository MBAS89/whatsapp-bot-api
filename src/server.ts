import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';
import { initializeWhatsAppClient } from './config/client';
import whatsappRoutes from './routes/routes';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: config.ALLOWED_ORIGIN }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Too many requests, try again later.',
});

app.use('/api/send-verification', limiter);
app.use('/api', whatsappRoutes);

app.get('/health', (_req, res ) => { res.send({ status: 'ok' }) });

app.listen(config.PORT, async () => {
  console.log(`[Server] Running on port ${config.PORT}`);
  await initializeWhatsAppClient();
});
