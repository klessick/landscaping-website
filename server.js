const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const app = express();
const port = 3000;

const upload = multer();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/submit', upload.none(), (req, res) => {
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

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Email error:', error);
                res.status(500).send('Error');
            } else {
                console.log('Email sent:', info.response);
                res.status(200).send('Success');
            }
        });
    } catch (error) {
        console.log('Server error in /submit:', error);
        res.status(500).send('Server error');
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});