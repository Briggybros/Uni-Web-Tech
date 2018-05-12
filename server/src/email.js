// @flow
import nodemailer from 'nodemailer';

let transporter;

nodemailer.createTestAccount((err, account) => {
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass,
        },
    });
});

export default function sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
        from: '"Bristol RAG" <noreply@bristolrag.com>',
        to,
        subject,
        text,
        html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    });
}
