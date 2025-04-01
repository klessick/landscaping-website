const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const { name, email, phone, message } = req.body;
        console.log('Received data:', req.body);

        if (!process.env.EMAIL_PASSWORD) {
            console.log('Error: EMAIL_PASSWORD environment variable is not set');
            return res.status(500).send('Server configuration error');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'klessick07@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: 'klessick07@gmail.com',
            to: 'klessick07@gmail.com',
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent');
        res.status(200).send('Success');
    } catch (error) {
        console.log('Server error in /submit:', error);
        res.status(500).send('Server error');
    }
};