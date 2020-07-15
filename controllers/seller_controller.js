const User = require('../models/user');
const Seller = require('../models/seller');


// Get sign up data
exports.create = async (req, res) => {
    let user = await Seller.findOne({ email: req.body.email });

    if(!user) {
        Seller.create(req.body, (err, user) => {
            if(err) {
                req.flash('error', 'User could not be created');
                console.log('error in creating user', err);
                return res.redirect('/sellers/login');
            }

            return res.render('seller_home', {
                title: 'shopKart | Seller Home',
                user: user
            });
        })
    }else{
        req.flash('error', 'User/email already exists');
        return res.redirect('back');
    }
}


// Update seller details    
exports.updateSeller = async (req, res) => {
    try {
        let seller = await Seller.findById(req.params.id);

        if (seller) {
            seller.firstName = req.body.firstName;
            seller.lastName = req.body.lastName;
            seller.email = req.body.email;
            seller.mobile = req.body.mobile;
    
            seller.save();
    
            req.flash('success', 'Your Profile has been updated');
            return res.redirect('back');
        }
        
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}


// Render Home Page
exports.home = (req, res) => {
    return res.render('seller_home', {
        title: 'shopKart | Sellers Home',
    });
}


// Login and create session
exports.createSession = (req, res) => {
    req.flash('success', 'You are logged in');  //flash message
    return res.redirect('/sellers/home');
}


// sign out user
exports.destroySession = (req, res) => {
    req.logout();
    req.flash('success', 'You have Logged Out!');  //flash message

    return res.redirect('/sellers/login');
}


// render sign in / sign up pages
exports.login = (req, res) => {
    return res.render('sellers_login', {
        title: 'shopKart | Sellers Login'
    });
}

