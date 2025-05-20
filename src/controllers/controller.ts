import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { whatsappClient, getLatestQR } from '../config/client';
import { config } from '../config/env';

export const getQRCode = (req: Request, res: Response): void => {
    const qr = getLatestQR();
    if (qr){
        res.json({ qr });
        return;
    }

    res.status(404).json({ message: 'No QR available. WhatsApp may be connected.' });
};

export const sendVerificationCode = async (req: Request, res: Response): Promise<void> => {
    const { phone, code } = req.body;
    if (!phone || !code){
        res.status(400).json({ error: 'Phone and code are required' });
        return;
    }  

    const phoneRegex = /^\+?[1-9]\d{7,14}$/;
    if (!phoneRegex.test(phone)){
        res.status(400).json({ error: 'Invalid phone format' });
        return;
    }  

    try {
        const chatId = `${phone.replace(/\D/g, '')}@c.us`;
        // Better way to check if client is ready
        if (!whatsappClient.info || whatsappClient.info instanceof Error) {
            res.status(503).json({ error: 'WhatsApp client not connected' });
            return;
        }

        await whatsappClient.sendMessage(chatId, `Your verification code is: ${code}`);

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message' });
        return
    }
};

export const getStatus = (req: Request, res: Response): void => {
    // If `whatsappClient.info` exists and is not an error, the client is likely connected
    const isConnected = !!whatsappClient.info && !(whatsappClient.info instanceof Error);
    res.json({ connected: isConnected });
};

export const generateToken = (req: Request, res: Response): void => {
    const user = req.query.user as string;
    if (!user){
        res.status(400).json({ error: 'User is required' });
        return
    }  

    const token = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
};
