
var userModel = require('../models/userModel');


exports.register = (req, callback) => {
console.log(" in server services data is ",req);

    userModel.register(req, (err, result) => {
        if (err) {
            //display the error
            console.log(err);
            return callback(err)
        }
        else {
            //return the result 
            return callback(null, result);
        }
    })

}


exports.login = (data, callback) => {
    userModel.login(data, (err, result) => {
        if (err) {
            //display the error
            console.log(err);
            callback(err);
        }
        else {
            //return the result
            console.log(" succesfull login userservice server ", result);
            callback(null, result);
        }
    })

}







