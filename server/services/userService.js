
var userModel = require('../models/userModel');


exports.register = (req, callback) => {
    console.log(" in server services data is ", req);

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
        console.log('in ser after model', err, result);

        if (err) {
            //display the error
            console.log('error in service', err);
            callback(err);
        }
        else {
            //return the result
            console.log(" succesfull login userservice server ", result);
            callback(null, result);
        }
    })

}





exports.forgetPassword = (data, callback) => {
    //console.log(" request data in service forget",data);

    userModel.forgetPassword(data, (err, result) => {

        // console.log(" requested to model data in service forget",data);
        if (err) {

            //display the error 
            console.log(err);
            callback(err)
        }
        else {

            //return the result of the function
            return callback(null, result);
        }
    })

}


exports.reset = (data, callback) => {
    console.log("in services reset");


    userModel.reset(data, (err, result) => {
        if (err) {
            callback(err);

        }
        else {
            return callback(null, result)
        }
    })
}


exports.allUser = (data, callback) => {

    userModel.allUser(data, (err, result) => {
        if (err) {
            //throw the error
            callback(err);
        }
        else {

            console.log(" All list of users", result)
            callback(null, result);
        }
    })

}

exports.addMessage = (req, callback) => {
    userModel.addMessage(req, (err, res) => {
        if (err) {
            return callback(err)
        } else {
            return callback(null, res);
        }
    })
}


exports.getUserMessage = (data, callback) => {

    // console.log("122:",req.body);
    userModel.getUserMessage(data, (err, result) => {
        if (err) {
            //throw the error
            return callback(err);
        }
        else {
            //return the result
            //  console.log("result in services",result);
            return callback(null, result);
        }
    })

}

