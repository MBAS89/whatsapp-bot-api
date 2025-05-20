import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { logger } from '../utils/logger';

let latestQRCode: string | null = null;

export const whatsappClient = new Client({
  authStrategy: new LocalAuth({
    dataPath: './whatsapp_session'
  }),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
  },
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  }
});

whatsappClient.on('qr', (qr) => {
  latestQRCode = qr;
  qrcode.generate(qr, { small: true });
  logger.info('✅[WhatsApp]  QR code received.');
});

whatsappClient.on('ready', () => {
  latestQRCode = null;
  logger.info('✅[WhatsApp] Client is ready.');
});

whatsappClient.on('authenticated', () => logger.info('🔐[WhatsApp] Authenticated.'));
whatsappClient.on('auth_failure', (msg) => logger.error(`❌[WhatsApp] Auth failure: ${msg}`));
whatsappClient.on('disconnected', (reason) => logger.warn(`✅[WhatsApp] Disconnected: ${reason}`));

export const getLatestQR = () => latestQRCode;

export const initializeWhatsAppClient = async () => {
  await whatsappClient.initialize();
};