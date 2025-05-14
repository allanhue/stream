const axios = require('axios');
require('dotenv').config();

class MpesaService {
    constructor() {
        this.baseUrl = process.env.MPESA_BASE_URL || "https://sandbox.safaricom.co.ke";
        this.consumerKey = process.env.MPESA_CONSUMER_KEY;
        this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
        this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
        this.passkey = process.env.MPESA_PASSKEY;
        this.accessToken = null;
        this.tokenExpiry = null;
    }

    async getAccessToken() {
        try {
            if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
                return this.accessToken;
            }

            const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
            const response = await axios.get(
                `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
                {
                    headers: {
                        'Authorization': `Basic ${auth}`
                    }
                }
            );

            this.accessToken = response.data.access_token;
            this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
            return this.accessToken;
        } catch (error) {
            console.error('Error getting access token:', error);
            throw new Error('Failed to get access token');
        }
    }

    async initiateSTKPush(phoneNumber, amount) {
        try {
            const accessToken = await this.getAccessToken();
            const timestamp = this.getTimestamp();
            const password = this.generatePassword(timestamp);

            const response = await axios.post(
                `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
                {
                    BusinessShortCode: this.businessShortCode,
                    Password: password,
                    Timestamp: timestamp,
                    TransactionType: "CustomerPayBillOnline",
                    Amount: amount,
                    PartyA: phoneNumber,
                    PartyB: this.businessShortCode,
                    PhoneNumber: phoneNumber,
                    CallBackURL: `${process.env.BASE_URL}/api/payment/callback`,
                    AccountReference: "Streaming Service",
                    TransactionDesc: "Payment for streaming service"
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
            console.error('Error initiating STK push:', error.response?.data || error);
            throw new Error('Failed to initiate payment');
        }
    }

    getTimestamp() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}${hour}${minute}${second}`;
    }

    generatePassword(timestamp) {
        const str = this.businessShortCode + this.passkey + timestamp;
        return Buffer.from(str).toString('base64');
    }
}

module.exports = new MpesaService();

const express = require('express');
const router = express.Router();
const mpesaService = require('../services/mpesaService');

// ...payment route implementation...

module.exports = router;