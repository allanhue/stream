# LanPrime Streaming Platform

A modern streaming platform built with React, Node.js, and PostgreSQL, featuring a robust authentication system, subscription management, and payment integration.

## 🏗️ Architecture Overview

### Frontend (Netlify)
- **Framework**: React 18 with Vite
- **State Management**: React Context + Custom Hooks
- **Styling**: TailwindCSS with custom animations
- **UI Components**: Custom components with Framer Motion animations
- **Routing**: React Router v6 with protected routes
- **API Integration**: Axios with interceptors for auth

### Backend (Render)
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL (Render)
- **Authentication**: JWT with refresh tokens
- **Payment Integration**: M-Pesa API
- **API Documentation**: Swagger/OpenAPI

## 🔄 Frontend-Backend Integration

### Authentication Flow
1. **Login/Register**:
   - Frontend sends credentials to `/api/auth/login` or `/api/auth/register`
   - Backend validates and returns JWT token
   - Token stored in localStorage with refresh mechanism

2. **Protected Routes**:
   - Axios interceptors add JWT to requests
   - 401 responses trigger automatic refresh
   - Failed refresh redirects to login

### API Communication
```javascript
// Frontend API setup
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// Auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🚀 Deployment Architecture

### Frontend (Netlify)
- **Build Process**: Vite production build
- **Environment Variables**: Netlify dashboard configuration
- **CORS**: Configured for Render backend
- **Routing**: SPA fallback for client-side routing

### Backend (Render)
- **Runtime**: Node.js 18
- **Database**: Render PostgreSQL
- **Environment**: Production with SSL
- **Scaling**: Auto-scaling based on traffic

## 🔧 Key Technical Challenges & Solutions

### 1. Database Connection
**Challenge**: Connecting to Render PostgreSQL with SSL
**Solution**:
```javascript
const getDbConfig = () => {
    if (process.env.NODE_ENV === 'production') {
        return {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        };
    }
    return {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    };
};
```

### 2. Authentication Security
**Challenge**: Secure token management and refresh
**Solution**:
- JWT with short expiration
- Refresh token rotation
- Secure HTTP-only cookies
- Token blacklisting for logout

### 3. CORS Configuration
**Challenge**: Cross-origin requests between Netlify and Render
**Solution**:
```javascript
const allowedOrigins = [
    'https://lanprimee.netlify.app',
    'https://stream-back-7dx8.onrender.com',
    'http://localhost:5173'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
```

### 4. Payment Integration
**Challenge**: Secure M-Pesa integration
**Solution**:
- Sandbox testing environment
- Webhook handling for payment status
- Transaction logging
- Error recovery mechanisms

## 📦 Environment Configuration

### Frontend (.env)
```env
VITE_API_URL=https://stream-back-7dx8.onrender.com
VITE_TMDB_API_KEY=your_tmdb_key
```

### Backend (.env)
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your_secret
ALLOWED_ORIGINS=https://lanprimee.netlify.app,https://stream-back-7dx8.onrender.com
```

## 🔐 Security Measures

1. **API Security**:
   - Rate limiting
   - Request validation
   - SQL injection prevention
   - XSS protection

2. **Data Protection**:
   - Password hashing with bcrypt
   - Sensitive data encryption
   - Secure session management

3. **Infrastructure Security**:
   - SSL/TLS encryption
   - Environment variable protection
   - Regular security updates

## 🚀 Performance Optimizations

1. **Frontend**:
   - Code splitting
   - Lazy loading
   - Image optimization
   - Caching strategies

2. **Backend**:
   - Connection pooling
   - Query optimization
   - Response compression
   - Caching headers

## 📈 Monitoring & Logging

1. **Error Tracking**:
   - Centralized error logging
   - Error boundary implementation
   - Performance monitoring

2. **User Analytics**:
   - Usage tracking
   - Performance metrics
   - Error reporting

## 🔄 CI/CD Pipeline

1. **Frontend (Netlify)**:
   - Automatic builds on push
   - Preview deployments
   - Environment-specific builds

2. **Backend (Render)**:
   - Automatic deployments
   - Health checks
   - Zero-downtime updates

## 🛠️ Development Workflow

1. **Local Development**:
   ```bash
   # Frontend
   cd test
   npm install
   npm run dev

   # Backend
   cd backend
   npm install
   npm run dev
   ```

2. **Testing**:
   - Unit tests
   - Integration tests
   - E2E testing

3. **Deployment**:
   - Staging environment
   - Production deployment
   - Rollback procedures

## 📚 Future Improvements

1. **Technical**:
   - Microservices architecture
   - Real-time features
   - Advanced caching
   - CDN integration

2. **Features**:
   - Social features
   - Content recommendations
   - Advanced analytics
   - Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - See LICENSE file for details 