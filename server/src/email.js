// @flow
import fileSystem from 'fs';
import path from 'path';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import containerized from 'containerized';

import config from '../../config.json';

const transporter = nodemailer.createTransport({
    host: containerized() ? 'mail' : config.email.url || 'localhost',
    port: config.email.port || 587,
    secure: config.email.secure || false,
    auth: {
        user: config.email.user,
        pass: config.email.password,
    },
});

export function confirmEmailTemplates(confirmCode: string): Promise<{html: string, plain: string}> {
    const verifyLink = `http://${config.website.url}/login/confirm?code=${confirmCode}`;
    return new Promise((resolve, reject) => {
        fileSystem.readFile(
            path.join(__dirname, '..', '..', 'confirm_email.txt'),
            'utf8',
            (err, text) => {
                if (err) {
                    return reject(err);
                }
                const plain = text.replace('VERIFY_LINK', verifyLink);
                return ejs.renderFile(
                    path.join(__dirname, '..', '..', 'confirm_email.ejs'),
                    {
                        verifyLink,
                    },
                    (err2, html) => {
                        if (err2) {
                            return reject(err2);
                        }
                        return resolve({
                            html,
                            plain,
                        });
                    },
                );
            },
        );
    });
}

export default function sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
        from: '"Bristol RAG" <webmanager@bristolrag.co.uk>',
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
        }
    });
}
