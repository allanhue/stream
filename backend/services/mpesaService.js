const unirest = require("unirest");
require('dotenv').config();

class MpesaService {
    constructor() {
        this.baseUrl = process.env.MPESA_BASE_URL || "https://sandbox.safaricom.co.ke";
        this.consumerKey = process.env.MPESA_CONSUMER_KEY;
        this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
        this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE;
        this.passkey = process.env.MPESA_PASSKEY;
    }

    // ...rest of the MpesaService implementation...
}

module.exports = new MpesaService();

const express = require('express');
const router = express.Router();
const mpesaService = require('../services/mpesaService');

// ...payment route implementation...

module.exports = router;