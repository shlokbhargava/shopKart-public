const nodeMailer = require('../config/nodemailer');


exports.profileUpdate = (user) => {

    let htmlString = nodeMailer.renderTemplate({ user: user}, '/profileUpd.ejs');

    nodeMailer.transporter.sendMail({
        from: '"shopKart" <shopcart.com>',
        to: user.email,
        subject: 'Profile Updated',
        html: htmlString,
    }, (err, info) => {
        if(err) {console.log('Error in sending profile update email', err); return;}

        console.log('Mail delivered', info);
        return;
    });
}