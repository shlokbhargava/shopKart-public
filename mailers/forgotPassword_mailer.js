const nodeMailer = require('../config/nodemailer');

exports.forgotPassword = (resetToken) => {
    let htmlString = nodeMailer.renderTemplate({ resetToken: resetToken}, '/forgotPassword.ejs');

    nodeMailer.transporter.sendMail({
        from: '"shopKart" ******',
        to: resetToken.user.email,
        subject: 'Forgot Password',
        html: htmlString,
    }, (err, info) => {
        if(err) {console.log('Error in sending forgot password email', err); return;}

        console.log('Mail delivered', info);
        return;
    });
}