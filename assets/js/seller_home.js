// hide all cards except personal Information
$('#Current-Orders').hide();
$('#Sell-Product').hide();
$('#Selling-History').hide();
$('.navbar, .second-nav').hide();


// Make nav links active
$(document).ready(function () {
    $('ul li a').click(function () {
        $('li a').removeClass("active");
        $(this).addClass("active");
    });
});


// Nav Links click functions
$('.personal').click(() => {
    $('#Personal-Information').show();
    $('#Personal-Information').css('animation', 'fadeIn 1s');
    $('#Current-Orders').hide();
    $('#Sell-Product').hide();
    $('#Selling-History').hide();
});
$('.current').click(() => {
    $('#Current-Orders').show();
    $('#Current-Orders').css('animation', 'fadeIn 1s');
    $('#Personal-Information').hide();
    $('#Sell-Product').hide();
    $('#Selling-History').hide();
});
$('.sell').click(() => {
    $('#Sell-Product').show();
    $('#Sell-Product').css('animation', 'fadeIn 1s');
    
    $('#Current-Orders').hide();
    $('#Personal-Information').hide();
    $('#Selling-History').hide();
});
$('.history').click(() => {
    $('#Selling-History').show();
    $('#Selling-History').css('animation', 'fadeIn 1s');
    
    $('#Current-Orders').hide();
    $('#Sell-Product').hide();
    $('#Personal-Information').hide();
});