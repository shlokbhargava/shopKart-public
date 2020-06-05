const nodeMailer = require('../config/nodemailer');
const path = require('path');


exports.newUser = (user) => {

    let htmlString = nodeMailer.renderTemplate({user: user}, '/signUp.ejs');

    nodeMailer.transporter.sendMail({
        from: '"shopKart" *****',
        to: user.email,
        subject: 'Welcome to shopKart',
        html: htmlString,
        attachments: [
            {
                filename: 'welcome.jpg',
                path: path.join(__dirname , '../assets/images', '/welcome.jpg'),
                cid: 'unique-welcome.jpg'
            },
            {
                filename: 'delivery.jpg',
                path: path.join(__dirname, '../assets/images', 'delivery.jpg'),
                cid: 'unique-delivery.jpg'

            }
        ]}, (err, info) => {
        if(err) {console.log('Error in sending signUp email', err); return;}

        console.log('Mail delivered', info);
        return;
    });
}

