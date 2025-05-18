# StreamVibe - Video Streaming Platform

A modern video streaming platform built with React, Node.js, and PostgreSQL.

## 🚀 Features

- User authentication and authorization
- Video streaming and playback
- Responsive design for all devices
- Secure payment processing
- Subscription management
- Social login integration

## 🛠 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Router
- Axios
- Context API for state management

### Backend
- Node.js
- Express.js
- PostgreSQL (hosted on Aiven)
- JWT Authentication
- CORS enabled
- SSL/TLS Security

## 📦 Setup and Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install frontend dependencies:
```bash
cd test
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Configure the following variables:
     ```
     # Frontend (.env)
     VITE_API_URL=your_backend_url
     
     # Backend (.env)
     DATABASE_URL=your_aiven_postgres_url
     PG_CA_CERT=./ca.pem
     JWT_SECRET=your_jwt_secret
     ALLOWED_ORIGINS=your_frontend_urls
     ```

5. SSL Certificate Setup:
   - Download the CA certificate from Aiven Console
   - Save it as `ca.pem` in your backend directory
   - Ensure the path in `.env` matches your certificate location

6. Start the development servers:
```bash
# Frontend (in test directory)
npm run dev

# Backend (in backend directory)
npm start
```

## 🗄️ Database

The application uses PostgreSQL hosted on Aiven. Aiven provides:
- Free tier for development
- Automatic backups
- Monitoring and metrics
- High availability
- Easy scaling

### SSL/TLS Security
- Uses Aiven's CA certificate for secure connections
- Implements proper SSL/TLS configuration
- Secure password hashing
- JWT-based authentication

To monitor your database:
1. Log in to Aiven Console
2. Navigate to your PostgreSQL service
3. Access metrics, logs, and performance data
4. Monitor connection pools and query performance

## 🔒 Security

- JWT-based authentication
- Secure password hashing
- CORS protection with specific origins
- Environment variable management
- Input validation and sanitization
- SSL/TLS encryption for database connections
- CA certificate validation

### CORS Configuration
The backend is configured to accept requests from specific origins:
- Frontend domain (e.g., https://lanprimee.netlify.app)
- Development server (http://localhost:5173)
- Additional origins as specified in ALLOWED_ORIGINS

## 🚀 Deployment

### Frontend
- Deployed on Netlify
- Automatic deployments from main branch
- Environment variables configured in Netlify dashboard

### Backend
- Deployed on Render
- Automatic deployments from main branch
- Environment variables configured in Render dashboard
- SSL/TLS configuration for secure database connections

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
