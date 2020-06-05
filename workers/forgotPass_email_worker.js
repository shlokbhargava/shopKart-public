const queue = require('../config/kue');

const forgotPasswordMailer = require('../mailers/forgotPassword_mailer');

queue.process('forgotPassword', function(job, done) {

    forgotPasswordMailer.forgotPassword(job.data);

    done();
})