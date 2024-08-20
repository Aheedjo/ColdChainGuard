import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, message } = req.body;

    try {
      await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to,
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
