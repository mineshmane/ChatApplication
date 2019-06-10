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
function model() {

}
model.prototype.register = () => {

}



var user = mongoose.model('user', userData);




// function hash(password, callback) {
//     bcrypt.hash(password, 10, function (err, hash) {
//         // Store hash in your password DB.
//         // if (err) {
//         //     callback(err);
//         // } else {
//         //     callback(null, hash);
//         // }

//     });
// }
function hash(password) {
    var hash = bcrypt.hashSync(password, 10)
    return hash;
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
            if (data.length > 0) {
                console.log(" email already registered");
                callback(data)

            } else {

                hash(req.body.password, (err, data) => {
                    if (err) {
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
            console.log("result in server usermodel after finding data: ", result);
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
                        console.log(token);


                        callback(null, {
                            token: token,
                            value: obj
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
        console.log(" result in find",result);
        
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



module.exports.reset = (res, callback) => {
    
        //generate a hash password for new password
        console.log("in model reset");
    
        let newPassword = hash(res.body.password)
        console.log("new pswd", newPassword);
        console.log(JSON.stringify(res.decoded))
        // update the new password in place of old password
        user.update({ '_id': res.decoded.payload._id }, { 'password': newPassword }, (err, data) => {
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


