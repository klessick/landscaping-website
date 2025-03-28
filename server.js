const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const app = express();
const port = 3000;

const upload = multer(); // Initialize Multer

app.use(express.urlencoded({ extended: true })); // For URL-encoded data
app.use(express.static(__dirname)); // Serve static files

app.post('/submit', upload.none(), (req, res) => {
    const { name, email, phone, message } = req.body;
    console.log('Received data:', req.body); // Debug log

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'klessick07@gmail.com',
            pass: 'process.env.EMAIL_PASSWORD' // Replace with your actual App Password
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
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});