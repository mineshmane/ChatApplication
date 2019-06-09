// const nodemailer = require('nodemailer');

// var mailer = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'mineshmane94@gmail.com',
//         pass: 'Rahul@12345'
//     }
// });
// var mailerOptions = {
//     from: 'mineshmane94@gmail.com',
//     to: 'shreyasidnale@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// }

// mailer.sendMail(mailerOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });








module.exports.mail = (url) => {
    var nodemailer = require('nodemailer');
   
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mineshmane94@gmail.com',
        pass: 'Rahul@12345'
      }
    });
  
    var mailOptions = {
      from: 'mineshmane94@gmail.com',
      to: 'mineshmane94@gmail.com',
      subject: 'Link for reset password ',
      text: url
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  
    });
  
  }
  
  