# WhatsApp Verification API

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express-v4.x-blue)
![WhatsApp-Web.js](https://img.shields.io/badge/WhatsApp--Web.js-v1.x-orange)

A Node.js API for sending WhatsApp verification codes using the unofficial WhatsApp Web API. This project provides a secure way to integrate WhatsApp messaging functionality into your applications.

## ⚠️ Important Disclaimer

**This project uses an unofficial WhatsApp API (whatsapp-web.js) which violates WhatsApp's Terms of Service. There is a significant risk that WhatsApp may ban accounts using this solution. Use at your own risk.**

## Features

- QR code based WhatsApp authentication
- JWT protected API endpoints
- Rate limiting for verification requests
- Session persistence with LocalAuth
- Health check endpoint
- CORS and security headers
- Status monitoring

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- WhatsApp account (with risk of being banned)
- Redis (optional, for production rate limiting)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/whatsapp-verification-api.git
   cd whatsapp-verification-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on the example:
   ```env
   PORT=3001
   JWT_SECRET=your_very_strong_secret_here
   ALLOWED_ORIGIN=http://yourfrontend.com
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The server will initialize the WhatsApp client and display a QR code in the console.

3. Scan the QR code with your WhatsApp mobile app to authenticate.

### API Endpoints

| Endpoint                 | Method | Description                           | Authentication |
| ------------------------ | ------ | ------------------------------------- | -------------- |
| `/api/token`             | GET    | Generate a JWT token (for demo only)  | None           |
| `/api/qr`                | GET    | Get the current WhatsApp QR code      | JWT            |
| `/api/send-verification` | POST   | Send a verification code via WhatsApp | JWT            |
| `/api/status`            | GET    | Check WhatsApp connection status      | JWT            |
| `/health`                | GET    | Server health check                   | None           |

### Example Requests

**Generate Token (for testing):**

```bash
curl "http://localhost:3001/api/token?user=admin"
```

**Get QR Code:**

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3001/api/qr
```

**Send Verification Code:**

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN" \
-d '{"phone": "+1234567890", "code": "123456"}' \
http://localhost:3001/api/send-verification
```

## Security Considerations

1. **WhatsApp Account Risk**: Using unofficial APIs may lead to account bans by WhatsApp.
2. **JWT Security**: Always use strong secrets and consider rotating them regularly.
3. **Rate Limiting**: The API implements basic rate limiting to prevent abuse.
4. **CORS**: Configure ALLOWED_ORIGIN to restrict frontend access.

## Architecture

```
whatsapp-verification-api/
├── config/
│   ├── client.ts    # WhatsApp client configuration
│   └── env.ts       # Environment configuration
├── controllers/
│   └── controller.ts # API route handlers
├── middlewares/
│   └── auth.ts      # JWT authentication
├── routes/
│   └── routes.ts    # API route definitions
├── utils/
│   └── logger.ts    # Logging utility
├── server.ts        # Express server setup
└── README.md
```

## Limitations and Risks

1. **Unofficial API**: This uses whatsapp-web.js which is not officially supported by WhatsApp.
2. **Account Bans**: WhatsApp actively bans accounts using automation tools.
3. **Session Persistence**: While LocalAuth helps, sessions may still expire unexpectedly.
4. **Scalability**: Not designed for high-volume messaging which increases ban risk.

## Contributing

Contributions are welcome, but please note the inherent risks of this project. Before contributing:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Alternatives

For production use, consider WhatsApp's official Business API:

- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp/cloud-api/)
