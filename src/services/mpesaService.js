const unirest = require("unirest");

class MpesaService {
    constructor() {
        this.baseUrl = "https://sandbox.safaricom.co.ke";
        this.consumerKey = "YOUR_CONSUMER_KEY";
        this.consumerSecret = "YOUR_CONSUMER_SECRET";
        this.businessShortCode = "174379";
        this.passkey = "YOUR_PASSKEY"; // Get this from Safaricom
    }

    async getAccessToken() {
        try {
            const response = await unirest
                .get(`${this.baseUrl}/oauth/v1/generate`)
                .query({ "grant_type": "client_credentials" })
                .headers({
                    "Authorization": `Basic ${Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString("base64")}`
                });

            return response.body.access_token;
        } catch (error) {
            throw new Error(`Error getting access token: ${error.message}`);
        }
    }

    generatePassword() {
        const timestamp = this.getTimestamp();
        const password = Buffer.from(
            `${this.businessShortCode}${this.passkey}${timestamp}`
        ).toString("base64");
        return { password, timestamp };
    }

    getTimestamp() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}${month}${day}${hour}${minutes}${seconds}`;
    }

    async initiateSTKPush(phoneNumber, amount) {
        try {
            const accessToken = await this.getAccessToken();
            const { password, timestamp } = this.generatePassword();

            const response = await unirest
                .post(`${this.baseUrl}/mpesa/stkpush/v1/processrequest`)
                .headers({
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                })
                .send({
                    BusinessShortCode: this.businessShortCode,
                    Password: password,
                    Timestamp: timestamp,
                    TransactionType: "CustomerPayBillOnline",
                    Amount: amount,
                    PartyA: phoneNumber,
                    PartyB: this.businessShortCode,
                    PhoneNumber: +25418238425,
                    CallBackURL: "https://app.netlify.com/lanprime",
                    AccountReference: "Streaming Service",
                    TransactionDesc: "Package Subscription"
                });

            return response.body;
        } catch (error) {
            throw new Error(`STK Push failed: ${error.message}`);
        }
    }
}

module.exports = new MpesaService();