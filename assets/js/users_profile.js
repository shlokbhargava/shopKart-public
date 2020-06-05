{
    $('.hidden-cards').hide();

    function checkValue() {
        if($('.hidden-cards').hide()) {
            $('.hidden-cards').show();
        }
    }

    // My Account
    $(".my-account").click(() => {
        $('#my-orders, #my-wallet, #customer-support, #delete-account').hide();
        $('.my-orders, .my-wallet, .customer-support, .delete-account').removeClass('btn-outline-primary');
        $('.my-account').addClass('btn-outline-primary');
        $("#my-account").show();
    });


    // My Orders
    $(".my-orders").click(() =>  {
        checkValue();
        $('#my-account, #my-wallet, #customer-support, #delete-account').hide();
        $('.my-account, .my-wallet, .customer-support, .delete-account').removeClass('btn-outline-primary');
        $('.my-orders').addClass('btn-outline-primary');
        $("#my-orders").show();
    });


    // My Wallet
    $(".my-wallet").click(() =>  {
        checkValue();
        $('#my-orders, #my-account, #customer-support, #delete-account').hide();
        $('.my-orders, .my-account, .customer-support, .delete-account').removeClass('btn-outline-primary');
        $('.my-wallet').addClass('btn-outline-primary');
        $("#my-wallet").show();
    });


    // Customer Support
    $(".customer-support").click(() =>  {
        checkValue();
        $('#my-orders, #my-wallet, #my-account, #delete-account').hide();
        $('.my-orders, .my-wallet, .my-account, .delete-account').removeClass('btn-outline-primary');
        $('.customer-support').addClass('btn-outline-primary');
        $("#customer-support").show();
    });


    // Delete Account
    $(".delete-account").click(() =>  {
        checkValue();
        $('#my-orders, #my-wallet, #customer-support, #my-account').hide();
        $('.my-orders, .my-wallet, .customer-support, .my-account').removeClass('btn-outline-primary');
        $('.delete-account').addClass('btn-outline-primary');
        $("#delete-account").show();
    });


}

