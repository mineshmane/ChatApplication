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
  
  

//   socket.on('createMessage', function (message) {
//     chatcontroller.addMessage(message, (err, data) => {
//         console.log('msg from server', message)
//         if (err) {
//             console.log("Error in message", err);

//         }
//         else {
//             console.log(message, "in server");
//             io.emit('newMessageSingle', message);
//         }
//     })
//     socket.on('disconnect', function () {
//         console.log("Socket disconnected");

//     });
// });







// module.exports.getUserMessage = (req, res) => {
//   try {
//     //   console.log("177:",req);
//     userService.getUserMessage(req, (err, result) => {


//       var response = {};
//       if (err) {
//         response.success = false;
//         response.err = err;
//         res.status(500).send(response);
//       }
//       else {
//         response.success = true;
//         response.result = result;
//         res.status(200).send(response);
//       }
//     })
//   }
//   catch (err) {
//     req.send(err);
//     console.log(err);

//   }
// }

// module.exports.addMessage = (res, callback) => {
//   try {
//     console.log(" reg request");
//     var response = {};
//     userService.addMessage(res, (err, result) => {
//       console.log("ctrl 205:", res);

//       if (err) {
//         // response.success=false;
//         // response.err=err;
//         // res.status(400).send(response);
//         // console.log("error in controller");
//         return callback(err);
//       } else {
//         // result.response=true;
//         // response.result=result;
//         // //res.status(200).send(response);

//         console.log("controller is working fine rc 243");
//         return callback(null, result);
//       }
//     })
//   }

//   catch (err) {
//     console.log("Error in sending message!");
//     callback(err)

//   }
// }









// module.exports.getUserMessage = (data, callback) => {
//   try {
//       // console.log("122:",req.body);
//       userModel.getUserMessage(data, (err, result) => {
//           if (err) {
//               //throw the error
//               return callback(err);
//           }
//           else {
//                //return the result
//               //  console.log("result in services",result);
//               return callback(null, result);
//           }
//       })
//   }
//   catch (err) {
//       //handle exception
//       console.log("in catch err", err);
//       callback(err);
//   }
// }


// module.exports.addMessage = (data, callback) => {
//   try {
//       console.log("ad service");

//       userModel.addMessage(data, (err, result) => {
//           if (err) {
//               //throw the error
//               return callback(err);
//           }
//           else {
//               //return the result
//               console.log("result", result);
//               return callback(null, result);
//           }
//       })
//   }
//   catch (err) {
//       //handle exception
//       callback(err);
//       console.log("err in rs catch", err);

//   }
// }
























// /**
//  * @description:create schema for sender emailId, receiver enailID,and message 
// */
// var chatSchema = new mongooseSchema({
//   "senderId": {
//       type: String,
//       // required: [true, "Sender id is require enter sender email id"]
//   },

//   "receiverId": {
//       type: String,
//       // required: [true, "Receiver id is require enter receiver email id"]
//   },

//   "message": {
//       type: String,
//       // required: [true, "Enter any message"]
//   }

// });
// var chat = mongoose.model('chatDatabase', chatSchema);


// module.exports.addMessage = (res, callback) => {
//   try {
//       console.log(' rm  257', res.senderId)

//       const newMsg = new chat({
//           "senderId": res.senderId,
//           "receiverId": res.receiverId,
//           "message": res.message
//       });
//       console.log("new Msg in model==>", newMsg);
//       /**
//    * @description: save the message into the database
//   */
//       newMsg.save((err, result) => {
//           if (err) {
//               console.log("Fail to store message", err);
//               return callback(err);
//           } else {
//               console.log("message saved in database");
//               return callback(null, result);
//           }
//       });
//   }

//   catch (err) {
//       console.log("result not found", err);
//       //  res.send(err)
//   }
// }


// module.exports.getUserMessage = (res, callback) => {
//   try {
//       //console.log("279:",res.body);
//       /**
//        * @description: find the all user messages and display it
//       */
//       chat.find({}, (err, result) => {
//           if (err) {
//               return callback(err);

//           }
//           else {
//               return callback(null, result);
//           }

//       })
//   }
//   catch (err) {
//       console.log("err c", err);

//       res.send(err);
//   }
// }