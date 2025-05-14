const axios = require('axios');
const { route } = require("../routes");
const { authService } = require('./services/authService');

class MpesaService {
    constructor() {
        this.baseUrl = process.env.MPESA_BASE_URL;
        this.consumerKey = process.env.MPESA_CONSUMER_KEY;
        this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
        this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
        this.passkey = process.env.MPESA_PASSKEY;
    }

    async getAccessToken() {
        try {
            const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
            const response = await axios.get(
                'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
                {
                    headers: {
                        'Authorization': `Basic ${auth}`
                    }
                }
            );
            return response.data.access_token;
        } catch (error) {
            throw new Error(`Error getting access token: ${error.message}`);
        }
    }

    generatePassword() {
        const timestamp = this.getTimestamp();
        const password = Buffer.from(
            `${this.businessShortCode}${this.passkey}${timestamp}`
        ).toString('base64');
        return { password, timestamp };
    }

    getTimestamp() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}${hour}${minutes}${seconds}`;
    }

    async initiateSTKPush(phoneNumber, amount) {
        try {
            const accessToken = await this.getAccessToken();
            const { password, timestamp } = this.generatePassword();

            const response = await axios.post(
                this.baseUrl,
                {
                    BusinessShortCode: this.businessShortCode,
                    Password: password,
                    Timestamp: timestamp,
                    TransactionType: "CustomerPayBillOnline",
                    Amount: amount,
                    PartyA: phoneNumber,
                    PartyB: this.businessShortCode,
                    PhoneNumber: phoneNumber,
                    CallBackURL: `${process.env.BASE_URL}/api/payments/callback`,
                    AccountReference: "LanPrime Subscription",
                    TransactionDesc: "Subscription Payment"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (error) {
            throw new Error(`STK Push failed: ${error.message}`);
        }
    }
}

// ...payment route implementation...
route.post(res,req){
async function handlesendrequesttransact = axios('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'),
    method: 'POST',
        Authorization:Bearer{ }
    }

// Check if current user is superadmin
if (authService.isSuperadmin()) {
    // Show superadmin features
}

module.exports = new MpesaService();