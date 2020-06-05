const queue = require('../config/kue');

const profileUpdateMailer = require('../mailers/profileUpd_mailer');

queue.process('profileUpd', function(job, done) {

    profileUpdateMailer.profileUpdate(job.data);

    done();
});