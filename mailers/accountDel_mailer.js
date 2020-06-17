const nodeMailer = require('../config/nodemailer');


exports.accountDeleted = (userDetails) => {

    let htmlString = nodeMailer.renderTemplate({ userDetails: userDetails}, '/accountDeleted.ejs');

    nodeMailer.transporter.sendMail({
        from: '"shopKart" <shopcart.com>',
        to: userDetails.email,
        subject: 'Account Deleted',
        html: htmlString,
    }, (err, info) => {
        if(err) {console.log('Error in sending account deleted email', err); return;}

        console.log('Mail delivered', info);
        return;
    });
}