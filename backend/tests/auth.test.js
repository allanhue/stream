import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.BASE_URL || 'http://localhost:3001';

const testAuth = async () => {
    try {
        // Test registration
        console.log('🔍 Testing registration...');
        const registerResponse = await axios.post(`${API_URL}/api/auth/register`, {
            email: 'test@example.com',
            password: 'Test123!',
            name: 'Test User'
        });
        console.log('✅ Registration test:', registerResponse.data);

        // Test login
        console.log('🔍 Testing login...');
        const loginResponse = await axios.post(`${API_URL}/api/auth/login`, {
            email: 'test@example.com',
            password: 'Test123!'
        });
        console.log('✅ Login test:', loginResponse.data);

        const token = loginResponse.data.token;

        // Test protected route
        console.log('🔍 Testing protected route...');
        const protectedResponse = await axios.get(`${API_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Protected route test:', protectedResponse.data);

        // Test token refresh
        console.log('🔍 Testing token refresh...');
        const refreshResponse = await axios.post(`${API_URL}/api/auth/refresh`, {
            refreshToken: loginResponse.data.refreshToken
        });
        console.log('✅ Token refresh test:', refreshResponse.data);

    } catch (error) {
        console.error('❌ Auth test failed:', error.response?.data || error.message);
    }
};

// Run tests
console.log('🔍 Starting authentication tests...');
testAuth(); 