$('#reset-pass').click(() => {
    let password = $('#new_password').val();
  
    if(password.length < 8) {
       
      alert('Password must be at least 8 characters');
      $('.new-passwordForm').attr('method', 'get');
      $('.new-passwordFormt').attr('action', 'back');

    }
  
    else{
      $('.new-passwordForm').attr('action', '/users/password/create-new');
    }
  });