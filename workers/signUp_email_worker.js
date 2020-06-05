const queue = require('../config/kue');

const signUpMailer = require('../mailers/signup_mailer');

queue.process('newUser', function(job, done) {

    signUpMailer.newUser(job.data);

    done();
});