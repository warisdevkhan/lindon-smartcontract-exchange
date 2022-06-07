var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.PASSWORD,
    },
	secure: true,
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
});

exports.sendEmail = function (to, subject, body, attachments = false, html = false) {

    return new Promise((resolve, reject) => {

        var mailData = {
            from: process.env.EMAIL_USER_NAME,  // sender email
            to: to,   // list of receivers emails
            subject: subject, // subject
            text: body, // body
        };

        if (attachments) {
            mailData.attachments = attachments;

            // mailData.attachments = [
            //     // {
            //     //     filename: 'text notes.txt',
            //     //     path: 'notes.txt'
            //     // },
            // ]
        }

        if (html) {
            mailData.html = html;
        }

        transporter.sendMail(mailData, function (error, response) {
            if (error) {
                console.log("-----ERROR-----" , error);
                reject(false);
            }
            if (response) {
                console.log("-----EMAIL SENT-----");
                resolve(true);
            }
        });
    })
}

module.exports = exports;
