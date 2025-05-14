const axios = require('axios');
const { route } = require("../routes");
const { authService } = require('./services/authService');

/**
 * Service for handling M-Pesa payment integrations
 */
class MpesaService {
    constructor() {
        this.baseUrl = process.env.MPESA_BASE_URL || 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        this.authUrl = process.env.MPESA_AUTH_URL || 'https://sandbox.safaricom.co.ke/oauth/v1/generate';
        this.consumerKey = process.env.MPESA_CONSUMER_KEY;
        this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
        this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
        this.passkey = process.env.MPESA_PASSKEY;

        // Validate required environment variables
        this.validateConfig();
    }

    /**
     * Validates that all required environment variables are set
     * @throws {Error} If any required configuration is missing
     */
    validateConfig() {
        const requiredEnvVars = [
            'MPESA_CONSUMER_KEY',
            'MPESA_CONSUMER_SECRET',
            'MPESA_BUSINESS_SHORT_CODE',
            'MPESA_PASSKEY'
        ];

        const missing = requiredEnvVars.filter(varName => !process.env[varName]);

        if (missing.length > 0) {
            throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
        }
    }

    /**
     * Gets an access token from M-Pesa API
     * @returns {Promise<string>} The access token
     * @throws {Error} If token retrieval fails
     */
    async getAccessToken() {
        try {
            const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
            const response = await axios.get(
                `${this.authUrl}?grant_type=client_credentials`,
                {
                    headers: {
                        'Authorization': `Basic ${auth}`
                    },
                    timeout: 10000 // 10 second timeout
                }
            );

            if (!response.data || !response.data.access_token) {
                throw new Error('Invalid response from M-Pesa API');
            }

            return response.data.access_token;
        } catch (error) {
            const errorMessage = error.response
                ? `Error getting access token: ${error.response.status} - ${JSON.stringify(error.response.data)}`
                : `Error getting access token: ${error.message}`;

            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    /**
     * Generates the M-Pesa API password and timestamp
     * @returns {Object} Object containing password and timestamp
     */
    generatePassword() {
        const timestamp = this.getTimestamp();
        const password = Buffer.from(
            `${this.businessShortCode}${this.passkey}${timestamp}`
        ).toString('base64');
        return { password, timestamp };
    }

    /**
     * Gets the current timestamp in the format required by M-Pesa API
     * @returns {string} Formatted timestamp
     */
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

    /**
     * Validates the phone number format
     * @param {string} phoneNumber - Phone number to validate
     * @returns {string} Properly formatted phone number
     * @throws {Error} If phone number is invalid
     */
    validatePhoneNumber(phoneNumber) {
        // Remove any non-digit characters
        const digitsOnly = phoneNumber.replace(/\D/g, '');

        // Check if it's a valid Kenyan number (starts with 254 and has correct length)
        if (!/^254\d{9}$/.test(digitsOnly)) {
            // If number starts with 0, replace with 254
            if (/^0\d{9}$/.test(digitsOnly)) {
                return `254${digitsOnly.substring(1)}`;
            }
            // If number starts with 7 or 1, add 254 prefix
            else if (/^[71]\d{8}$/.test(digitsOnly)) {
                return `254${digitsOnly}`;
            }
            throw new Error('Invalid phone number format. Must be a valid Kenyan number.');
        }

        return digitsOnly;
    }

    /**
     * Initiates an STK Push request to the customer's phone
     * @param {string} phoneNumber - Customer's phone number
     * @param {number} amount - Amount to charge
     * @param {string} reference - Optional reference ID
     * @returns {Promise<Object>} M-Pesa API response
     * @throws {Error} If the request fails
     */
    async initiateSTKPush(phoneNumber, amount, reference = null) {
        try {
            // Validate inputs
            if (!phoneNumber || !amount) {
                throw new Error('Phone number and amount are required');
            }

            if (isNaN(amount) || amount <= 0) {
                throw new Error('Amount must be a positive number');
            }

            // Format phone number
            const formattedPhone = this.validatePhoneNumber(phoneNumber);

            // Get credentials
            const accessToken = await this.getAccessToken();
            const { password, timestamp } = this.generatePassword();

            // Prepare reference
            const accountReference = reference || "LanPrime Subscription";

            // Prepare request payload
            const payload = {
                BusinessShortCode: this.businessShortCode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: Math.round(amount), // Ensure amount is an integer
                PartyA: formattedPhone,
                PartyB: this.businessShortCode,
                PhoneNumber: formattedPhone,
                CallBackURL: `${process.env.BASE_URL}/api/payments/callback`,
                AccountReference: accountReference,
                TransactionDesc: "Subscription Payment"
            };

            console.log(`Initiating STK Push for phone: ${formattedPhone}, amount: ${amount}`);

            // Send request
            const response = await axios.post(
                this.baseUrl,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 15000 // 15 second timeout
                }
            );

            console.log(`STK Push response: ${JSON.stringify(response.data)}`);
            return response.data;
        } catch (error) {
            const errorMessage = error.response
                ? `STK Push failed: ${error.response.status} - ${JSON.stringify(error.response.data)}`
                : `STK Push failed: ${error.message}`;

            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    /**
     * Process the callback from M-Pesa
     * @param {Object} callbackData - Callback data from M-Pesa
     * @returns {Object} Processed result
     */
    processCallback(callbackData) {
        try {
            // Extract the result code and necessary info from callback
            const { Body } = callbackData;
            if (!Body || !Body.stkCallback) {
                throw new Error('Invalid callback data structure');
            }

            const { ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback;

            // If payment was successful
            if (ResultCode === 0) {
                // Extract relevant payment details from metadata
                const metadata = {};

                if (CallbackMetadata && CallbackMetadata.Item) {
                    CallbackMetadata.Item.forEach(item => {
                        if (item.Name && item.Value) {
                            metadata[item.Name] = item.Value;
                        }
                    });
                }

                return {
                    success: true,
                    message: ResultDesc,
                    transactionId: metadata.MpesaReceiptNumber || null,
                    amount: metadata.Amount || null,
                    phoneNumber: metadata.PhoneNumber || null,
                    transactionDate: metadata.TransactionDate || null,
                    rawData: callbackData
                };
            } else {
                return {
                    success: false,
                    message: ResultDesc || 'Payment failed',
                    resultCode: ResultCode,
                    rawData: callbackData
                };
            }
        } catch (error) {
            console.error(`Error processing M-Pesa callback: ${error.message}`);
            return {
                success: false,
                message: `Error processing callback: ${error.message}`,
                error: error.message,
                rawData: callbackData
            };
        }
    }
}

// Payment route implementation
route.post('/api/payments/initiate', async (req, res) => {
    try {
        // Check authorization
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Extract data from request
        const { phoneNumber, amount } = req.body;

        if (!phoneNumber || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and amount are required'
            });
        }

        // Create service instance
        const mpesaService = new MpesaService();

        // Initiate payment
        const response = await mpesaService.initiateSTKPush(phoneNumber, amount);

        // Return response
        return res.status(200).json({
            success: true,
            message: 'STK push initiated successfully',
            data: response
        });
    } catch (error) {
        console.error(`Payment initiation error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: error.message || 'Payment initiation failed'
        });
    }
});

// Callback handler for M-Pesa responses
route.post('/api/payments/callback', async (req, res) => {
    try {
        // Process the callback
        const mpesaService = new MpesaService();
        const result = mpesaService.processCallback(req.body);

        // Store the result in database or perform other operations here
        console.log('M-Pesa callback processed:', result);

        // Always return a success response to M-Pesa
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(`Callback processing error: ${error.message}`);
        // Still return success to M-Pesa to prevent retries
        return res.status(200).json({ success: true });
    }
});

// Admin route with authentication
route.get('/api/payments/admin', async (req, res) => {
    try {
        // Check if current user is superadmin
        if (!authService.isSuperadmin(req.user)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: Requires superadmin privileges'
            });
        }

        // Superadmin features would go here
        // ...

        return res.status(200).json({
            success: true,
            message: 'Admin panel data',
            data: { /* admin data */ }
        });
    } catch (error) {
        console.error(`Admin route error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: error.message || 'An error occurred'
        });
    }
});

module.exports = new MpesaService();