// get date 
var d = new Date();

// get weekday in string
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var day = weekdays[d.getDay()];

// get month in string
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var month = months[d.getMonth()];

// Show date 
$('.delivery-date').html('<b>Delivery By</b> : ' + day + ', ' + d.getDate() + '<sup>th</sup> ' + month + ', ' + d.getFullYear());


// increasing or decreasing the quantity of items in cart
var quantity = 1;
$('.qty').html(quantity);
$('.fa-plus-square').click(() => {
    $('.max-min-qty').html(' ');
    quantity += 1;
    if (quantity < 6) {
        $('.qty').html(quantity);
    }else{
        $('.max-min-qty').html(' Maximum of 5 quantity can be ordered');
        quantity = 5;
        $('.qty').html(quantity);
    }
});

$('.fa-minus-square').click(() => {
    $('.max-min-qty').html(' ');
    quantity -= 1;
    if (quantity <= 0) {
        $('.max-min-qty').html(' Minimum 1 quantity is required to place the order');
        quantity = 1;
        $('.qty').html(quantity);
    }else{
        $('.qty').html(quantity);
    }

});



