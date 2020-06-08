const Address = require('../models/user_address');
const User = require('../models/user');

exports.newAddress = async (req, res) => {

    try {
        
        let user = await User.findById(req.body.user);

        if(user) {
            let address = await Address.create({
                user: req.user._id,
                fName: req.body.fName,
                lName: req.body.lName,
                mNumber: req.body.mNumber,
                altNumber: req.body.altNumber,
                fNumber: req.body.fNumber,
                address: req.body.address,
                address2: req.body.address2,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                zip: req.body.zip
            });

            user.address.push(address);
            user.save();

            req.flash('success', 'New Address Added');
            return res.redirect('back');
        }

    } catch (error) {
        console.log('error in creating new address', error);
        req.flash('error', 'Address could not be added');
        return res.redirect('back');
    }
}


// Delete an address
exports.deleteAddress = async (req, res) => {
    
    try {
        let address = await Address.findById(req.params.id);

        let userId = address.user;
    
        address.remove();
    
        await User.findByIdAndUpdate(userId, { $pull: {address: req.params.id}});
    
        req.flash('success', 'Address deleted');
        return res.redirect('back');
    } catch (error) {
        req.flash('error', 'Could not delete the address');
        console.log('error in deleting the address', error);
        return res.redirect('back');
    }
}