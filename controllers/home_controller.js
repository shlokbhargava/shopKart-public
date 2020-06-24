module.exports.homePage = (req,res) => {
    return res.render('home', {
        title: "shopKart | Home"
    });     
}