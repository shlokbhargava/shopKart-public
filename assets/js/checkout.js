$('.btn-outline').click(() => {

    let couponCode = $('#coupon').val().toLowerCase();

    if (couponCode == 'first100') {
        $('.success-fail').html('Yay! Coupon apllied, you save ₹ 100');
        $('.success-fail').css('color', 'green');
    }else if (couponCode == ''){
        alert('Coupon field can not be empty');
        return;
    }else{
        $('.success-fail').html('Invalid coupon code');
        $('.success-fail').css('color', 'red');
    }
});


$('.pay').click(() => {

    setTimeout(function() {
        $('.bd-example-modal-lg').modal();
    }, 0000);

    setTimeout(function() {
        $('.bd-example-modal-lg').modal('hide');
      }, 4000);

    setTimeout(function() {
        $('.bd-example-modal-sm').modal();
    }, 4001);

    var target = $('#success-page').attr('href');
    setTimeout(function(){
        window.location = target;
    }, 6000);

});
