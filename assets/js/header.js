$(".toggle-password").click(function() {
    
    $(this).toggleClass("fa-eye fa-eye-slash");
    let input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
});


$('#create-account').click(() => {
  let password = $('#password').val();

  if(password.length < 8) {
    alert('password must be at least 8 characters');
    $('.create-account').attr('method', 'get');
    $('.create-account').attr('action', '/');
  }

  else{
    $('.create-account').attr('action', '/users/create-account');
  }
})


