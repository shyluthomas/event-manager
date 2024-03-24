import nodemailer from 'nodemailer';

 type Mailer = {
 to: string;
 subject: string;
 text: string
}
export type EmailresponsType = {
    status: number
}

const mailer = {
    sendMail: async (userData: Mailer): Promise<EmailresponsType>  => {
        let res:EmailresponsType = {status: 500};
        try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'killurockz@gmail.com',
                pass: '@destinada99'
            }
        });

        const mailOptions = {
            from: 'killurockz@gmail.com',
            to: userData.to,
            subject: userData.subject,
            text: userData.text
        };

       
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res = {status: 500};
                console.error('Error occurred while sending email:', error);
            } else {
                console.log('Email sent:', info.response);
                res = {status: 200};
            }
        });
    } catch(e) {
        res = {status: 500};
        console.error('Error occurred while sending email:', e);
    }

        return res;

    }
}

export default mailer;
  