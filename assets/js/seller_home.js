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
    $('#Personal-Information').css('animation', 'fadeIn 0.5s');
    $('#Personal-Information').show();
    $('#Current-Orders').hide();
    $('#Sell-Product').hide();
    $('#Selling-History').hide();
});
$('.current').click(() => {
    $('#Current-Orders').css('animation', 'fadeIn 0.5s');
    $('#Current-Orders').show();
    $('#Personal-Information').hide();
    $('#Sell-Product').hide();
    $('#Selling-History').hide();
});
$('.sell').click(() => {
    $('#Sell-Product').css('animation', 'fadeIn 0.5s');
    $('#Sell-Product').show();
    $('#Current-Orders').hide();
    $('#Personal-Information').hide();
    $('#Selling-History').hide();
});
$('.history').click(() => {
    $('#Selling-History').css('animation', 'fadeIn 0.5s');
    $('#Selling-History').show();
    $('#Current-Orders').hide();
    $('#Sell-Product').hide();
    $('#Personal-Information').hide();
});