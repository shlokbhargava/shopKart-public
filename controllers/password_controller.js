const User = require('../models/user');
const resetPassword = require('../models/reset_password');
const crypto = require('crypto');
const queue = require('../config/kue');
const forgotPasswordEmailWorker = require('../workers/forgotPass_email_worker');

exports.resetRequest = (req, res) => {       


}


// Forgot Password Request
exports.forgotPassword = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    
    if (user) {
       let resetToken = await resetPassword.create({
          user: user, 
          accessToken: crypto.randomBytes(20).toString('hex'),
          isValid: true
       });
       
       if (resetToken) {

         queue.create('forgotPassword', resetToken).save();

         req.flash('success', 'Reset Password link sent successfully');
         return res.redirect('back');

       } else {

         console.log('accessToken not generated', err);
         req.flash('error', 'Try again');
         return;
       }
    } else {
      req.flash('error', 'The entered email id is not registered');
      return res.redirect('back');
    }
}


// Create new password page
exports.createPassPage = async (req, res) => {

   try {
      let resetToken = await resetPassword.findById(req.params.id);

      return res.render('create-new-passPage', {
         title: 'Create New Password',
         resetToken: resetToken
      });
   } catch (error) {
      console.log('error in rendering create new password page', err);
      return;
   }
}

// Creating New Password For the user
exports.createNewPassword = async (req, res) => {
   try {
      if(req.body.new_password != req.body.confirm_new_password){
          return res.redirect('back');
      }

      let resetToken = await resetPassword.findById(req.params.id);
      
      if(resetToken) {
         if(resetToken.isValid) {
            let user = await User.findById(resetToken.user);

            user.password = req.body.new_password;

            user.save();

            resetToken.isValid = false;

            resetToken.save();

            req.flash('success', 'Password changed. Login again');
            return res.redirect('back');
         }
      }
      
   }catch(error) {
      console.log('error in setting new password', error);
      return;
   }   

}