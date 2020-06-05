const queue = require('../config/kue');

const accountDeletedMailer = require('../mailers/accountDel_mailer');

queue.process('accountDeleted', function(job, done) {

    accountDeletedMailer.accountDeleted(job.data);

    done();
});