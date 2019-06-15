const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config/config');


const bcrypt = require('bcrypt');


/**
* @description    : create schema
*/
var mongooseSchema = mongoose.Schema;
var userData = mongooseSchema({
    "firstname": {
        type: String,
        required: true,


    },
    "lastname": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    "password": {
        type: String,
        required: true,
    }


},
    {
        timestamps: true
    });
// function model() {

// }
// model.prototype.register = () => {

// }



var user = mongoose.model('user', userData);




function hash(password, callback) {
    bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            callback(err);
        } else {
            callback(null, hash);
        }

    });
}



exports.register = (req, callback) => {

    console.log(" firstname", req.body);
    console.log(" body maail", req.body.email);

    // Validate request
    user.find({ 'email': req.body.email }, function (err, data) {
        if (err) {
            console.log(err);
            return callback(err)
        } else {
            console.log(" data in else", data);
            console.log(" data in else", req.body.email);

            if (data.length > 0) {
                console.log(" email already registered");
                callback(data)

            } else {
                console.log(" data in after entghelse", data);
                console.log(" data in after entghelse", req.body.email);
                console.log(" data in after entghelse", req.body.password);

                hash(req.body.password, (err, data) => {
                    console.log(" data in after entghelse", data);
                    if (err) {
                        console.log(" hashing error ", err);

                        callback(err);
                    } else {
                        console.log(" hashed password", data);

                        // Create a Note
                        const newUser = new user(
                            {
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                email: req.body.email,
                                password: data
                            })

                        // Save Note in the database
                        newUser.save(function (err, data) {
                            if (err) {
                                console.log(" data not saved  model");

                                return callback(err);
                            } else {
                                console.log('inside saved');

                                console.log(" data saved successsfullyy", data)
                                return callback(null, data);
                            }
                        });
                    }
                });

            }
        }
    });
};


exports.login = (req, callback) => {
    /**
     * @description: check the email address and if already present throw error
    */
    user.find({ "email": req.email }, function (err, result) {
        console.log("email in user model ", result);
        if (err) {
            console.log(" user is not registered please register", err);
            return callback(err);
        } else if (result.length > 0) {
            console.log("result in server usermodel after finding data: ", result[0]._id);
            /**
             * @description: compare the database password with the user entered password
            */
            console.log(" comapare is working now ", req.password);
            console.log("result password...", result[0].password)
            bcrypt.compare(req.password, result[0].password, function (err, obj) {
                if (err) {
                    console.log("error in model please enter correct password: ", err);
                    callback(err);
                }
                else {
                    console.log('result after compare', obj);
                    if (obj) {
                        console.log("Login result returniing  no error if", obj);
                        var token = jwt.sign({ email: req.email }, config.secretKey, { expiresIn: 86400000 });
                        console.log("token is printed after login: ", token);
                        callback(null, {
                            token: token,
                            value: obj,
                            userId: result[0]._id,
                            userName: result[0].firstname
                        });
                    } else {
                        console.log("Login result returniing  no error else", obj);
                        callback({ message: 'Password Incorrect' });
                    }
                    //show result if data is correct
                }
            })
        }
        else {
            //else print the error message
            console.log("you enterd wronng password ")
            callback({ message: 'user does not exist' });
        }
    });
}





exports.forgetPassword = (res, callback) => {

    //check the email address 
    user.findOne({ "email": res.body.email }, function (err, result) {
        console.log(" result in find", result);

        if (err) {
            console.log(err);
        }
        else {
            //check the registered email address with the email address entered while forget password
            if (result !== null && res.body.email == result.email) {
                //console.log("ur name"+res.name);
                callback(null, result)

            }
            else {
                callback("incorrect Email");
            }

        }
    })

}

exports.reset = (res, callback) => {

    //generate a hash password for new password
    console.log("in model reset");

    //let newPassword hashing 
    hash(res.body.password, (err, newpassword) => {
        console.log(" data in after entghelse", newpassword);
        if (err) {
            console.log(" hashing error ", err);

            callback(err);
        }
        else {

            console.log("new pswd", newpassword);
            console.log(JSON.stringify(res.decoded))
            // update the new password in place of old password
            user.update({ '_id': res.decoded.payload._id }, { 'password': newpassword }, (err, data) => {
                if (err) {
                    console.log("err in reset model", err);
                    callback(err)
                }
                else {
                    console.log("fine")
                    callback(null, data);
                }
            });

        }

    });
}





exports.allUser = (res, callback) => {
    try {
        //find the all the users in database
        user.find({}, (err, data) => {
            if (err) {
                console.log(err, "error is there")
                return callback(err);
            }
            else {
                //return the result
                return callback(null, data)
            }
        })
    }
    catch (err) {
        //handle exception
        res.send(err);
    }
}



/**
 * @description:create schema for sender emailId, receiver enailID,and message 
*/
var chatSchema = mongooseSchema({
    "senderId": {
        type: String,
        required: [true, "Sender id is require enter sender email id"]
    },

    "receiverId": {
        type: String,
        required: [true, "Receiver id is require enter receiver email id"]
    },

    "message": {
        type: String,
        required: [true, "Enter any message not empty "]
    }

},
    {
        timestamps: true
    });
var chat = mongoose.model('chatDatabase', chatSchema);



exports.getUserMessage = (res, callback) => {
    try {
        console.log("279:", res);
        /**
         * @description: find the all user messages and display it
        */
        chat.find({}, (err, result) => {
            if (err) {
                return callback(err);

            }
            else {
                return callback(null, result);
            }

        })
    }
    catch (err) {
        console.log("err c", err);

        res.send(err);
    }
}

exports.addMessage = (req, callback) => {
    try {
        console.log(' in model sender id', req.senderId)

        const newMsg = new chat({
            "senderId": req.senderId,
            "receiverId": req.receiverId,
            "message": req.message
        });
        console.log("new Msg in model==>", newMsg);
        /**
     * @description: save the message into the database
    */
        newMsg.save((err, result) => {
            if (err) {
                console.log("Fail to store the message", err);
                return callback(err);
            } else {
                console.log("message stored in database");
                return callback(null, result);
            }
        });
    }

    catch (err) {
        console.log("result not found", err);
        //  res.send(err)
    }
}




