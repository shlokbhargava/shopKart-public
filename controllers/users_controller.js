const User = require('../models/user');
const Address = require('../models/user_address');
const signUpMailer = require('../mailers/signup_mailer');
const passport = require('passport');
const queue = require('../config/kue');
const signUpEmailWorker = require('../workers/signUp_email_worker');
const profileUpdEmailWorker = require('../workers/profileUpd_email_worker');
const accountDelEmailWorker = require('../workers/accountDel_email_worker');
const paymentIntent = require('../config/stripe');


// get the sign up data
exports.create = async (req, res) => {

    let user = await User.findOne({ email: req.body.email});

    if(!user) {
        User.create(req.body, (err, user) => {
            if(err) {
                req.flash('error', 'User could not be created');
                console.log('error in creating user', err);
                return res.redirect('/');
            }

            // signUpMailer.newUser(user); 
            let job = queue.create('newUser', user).save();

            return res.render('home', {
                title: 'shopKart | Home',
                user: user
            });
        });
    }else{
        req.flash('error', 'User/email already exists');
        return res.redirect('back');
    }
}


// sign  in and create a session for the user
exports.createSession = (req, res) => {
    req.flash('success', 'You are logged in');  //flash message
    return res.redirect('/');
}

// sign out user
exports.destroySession = (req, res) => {
    req.logout();
    req.flash('success', 'You have Logged Out!');  //flash message

    return res.redirect('/');
}


// Users Profile Page
exports.userProfile = async (req, res) => {
    
    try {
        let user = await User.findById(req.params.id);

        let address = await Address.find({ user: user._id });

        return res.render('users_profile', {
            title: "My Profile",
            profile_user: user,
            address: address
        });
    } catch (err) {
        console.log('Error in finding user to render profile', err); 
        return res.redirect('back');
    }
}


// Update Users Profile
exports.updateUser = async (req, res) => {

    try {
        let user = await User.findById(req.params.id);

        if (user) {

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.mobile = req.body.mobile;
    
            user.save();

            queue.create('profileUpd', user).save();
    
            req.flash('success', 'Your Profile has been updated');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in updating user profile', err); return;
    }
}


//  Users cart
exports.userCart = async (req, res) => {

    let user = await User.findById(req.params.id);

    return res.render('user_cart', {
        user: user,
        title: 'shopKart | Cart'
    });
}


// Accepting Payments
exports.session = async (req, res) => {

}


// delete user
exports.delete = async (req, res) => {
    
    try {
        let user = await User.findById(req.params.id);
        let userDetails = await User.findById(req.params.id);

        if(user) {
            if(req.body.password == user.password) {

                console.log(userDetails);

                user.remove();

                await Address.deleteMany({user: req.params.id});

                let job = queue.create('accountDeleted', userDetails).save();

                req.flash('info', 'Your account has been deleted');

                req.logout();
                return res.redirect('/');
            }else {
                req.flash('error', 'Incorrect password');
                return res.redirect('back');
            }
        }
    } catch (error) {
        console.log('error in deleting a user', err);
        return;
    }
}