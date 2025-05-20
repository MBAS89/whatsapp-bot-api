import { Router } from 'express';
import {
    getQRCode,
    sendVerificationCode,
    getStatus,
    generateToken,
} from '../controllers/controller';

import { authenticateJWT } from '../middlewares/auth';

const router = Router();

router.get('/qr', authenticateJWT, getQRCode);
router.post('/send-verification', authenticateJWT, sendVerificationCode);
router.get('/status', authenticateJWT, getStatus);
router.get('/token', generateToken); // Demo only – remove in production

export default router;