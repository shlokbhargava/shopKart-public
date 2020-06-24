$('.main header, .second-nav').hide();


$('.login-header').css('background-color', 'rgb(250, 249, 246)');
$('.signup-header').css('background-color', 'white');
$('#signUpform').hide();

$('#login-link').click(() => {
    $('#login-form').show();
    $('#signUpform').hide();
    $('.footer-login').show();
    $('.login-header').css('background-color', 'rgb(250, 249, 246)');
    $('.signup-header').css('background-color', 'white');
});

$('#signup-link').click(() => {
    $('#signUpform').show();
    $('#login-form').hide();
    $('.footer-login').hide();
    $('.signup-header').css('background-color', 'rgb(250, 249, 246)');
    $('.login-header').css('background-color', 'white');
});

$('#create-seller').click(() => {
    let password = $('#password-1').val();
  
    if(password.length < 8) {
      alert('password must be at least 8 characters');
      $('#signUpform').attr('method', 'get');
      $('#signUpform').attr('action', '/sellers/login');
    }
  
    else{
      $('#signUpform').attr('action', '/sellers/create-account');
    }
  });


  $('#signUP').click(() => {
    $('#signUpform').show();
    $('#login-form').hide();
    $('.footer-login').hide();
  });

