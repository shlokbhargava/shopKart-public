const User = require('../models/user');
const Address = require('../models/user_address');
const signUpMailer = require('../mailers/signup_mailer');
const passport = require('passport');
const queue = require('../config/kue');
const signUpEmailWorker = require('../workers/signUp_email_worker');
const profileUpdEmailWorker = require('../workers/profileUpd_email_worker');
const accountDelEmailWorker = require('../workers/accountDel_email_worker');
const Cart = require('../models/user_cart');
const Product = require('../models/product');
const UserOrder = require('../models/user_orders');


// get the sign up data
exports.create = async (req, res) => {

    let user = await User.findOne({ email: req.body.email});
    let product = await Product.find({});

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
                user: user,
                product: product
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

        let order = await UserOrder.find({ user: user._id }).populate('cart');

        let cart = await Cart.findById(order.cart).populate('product');

        return res.render('users_profile', {
            title: "My Profile",
            profile_user: user,
            address: address,
            order: order,
            cart: cart
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
    let cart = await Cart.find({ user: user._id }).populate('product');

    return res.render('user_cart', {
        user: user,
        cart: cart,
        title: 'shopKart | Cart'
    });
}


//  Add To Cart
exports.addToCart = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id);
        let user = await User.findById(req.query.id);

        let cart = await Cart.findOne({ product: product });

        if (cart) {
            req.flash('info', 'Product is already in your cart');
            return res.redirect('back');
        }else{
            let cart1 = await Cart.create({
                product: product._id,
                user: user._id
            });

            user.cart.push(cart1);
            user.save();
        }
    
        req.flash('success', 'Added to cart');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'err');
        return res.redirect('back');
    }
}


// remove a product from the cart
exports.deleteFromCart = async (req, res) => {

    try {
        let cart = await Cart.findById(req.params.id);

        let userId = cart.user;
    
        cart.remove();
    
        await User.findByIdAndUpdate(userId, { $pull: {cart: req.params.id}});
    
        req.flash('info', 'Product Removed from cart');
        return res.redirect('back');
    } catch (error) {
        req.flash('error', 'Could not delete the product from the cart');
        return res.redirect('back');
    }
}


// chechkout cart
exports.checkOut = async (req, res) => {

    try {
        let user = await User.findById(req.params.id);
        let cart = await Cart.find({ user: user._id }).populate('product');
        let address = await Address.find({ user: req.params.id });
    
        return res.render('checkout', {
            address: address,
            cart: cart,
            user: user,
            title: 'Checkout Page'
        });
    } catch (error) {
        req.flash('error', 'Could not render the checkOut Page Try Again');
        return res.redirect('back');
    }

}


// Order Placed
exports.orderPlaced = async (req, res) => {

    try {
        let user = await User.findById(req.params.id);
        let cart = await Cart.find({ user: user._id }).populate('product');
        let product = await Product.findById(cart.product);
        let order = await UserOrder.create({
            user: user,
            product: product
        });

        user.order.push(order);
        user.save();

        return res.render('order_placed', {
            title: 'Order Placed Successfully'
        });

    } catch (error) {
        console.log(error);
        req.flash('error', 'Order Could not be Proccessed. Any amount deducted will be refunded');
        return res.redirect('/');
    }
}



// delete user
exports.delete = async (req, res) => {
    
    try {
        let user = await User.findById(req.params.id);
        let userDetails = await User.findById(req.params.id);

        if(user) {
            if(req.body.password == user.password) {

                user.remove();

                await Address.deleteMany({user: req.params.id});

                await UserOrder.deleteMany({user: req.params.id});

                await Cart.deleteMany({user: req.params.id});

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