const mongoose = require('mongoose');


const bcrypt = require('bcrypt');
const saltRounds = 10;

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

// userData.pre('save', async function (next) {

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashpassword = await bcrypt.hash(this.password, salt);
//         console.log(" salt :", salt);

//         console.log(" before hashing password ", this.password);
//         console.log(" afterv hashing ", hashpassword);
//         this.password = hashpassword;

//         next();
//     } catch (error) {
//         next(error)
//     }
// })

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

    user.find({ 'email': req.email }, function (err, data) {
        if (err) {
            console.log(err);
            return callback(err)
        } else {
            if (data.length > 0) {
                console.log(" email already registered");

            }
        }
    });

    // Validate request
    if (!req.body.email) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
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
};


exports.login = (res, callback) => {

    /**
     * @description: check the email address and if already present throw error
    */
    user.findOne({ "email": res.email }, function (err, result) {
        if (err) {
            console.log(err);
            return callback(err)
        }
        else if (result != null) {
            console.log("result in server usermodel after finding data: ", result);

            /**
             * @description: compare the database password with the user entered password
            */
            bcrypt.compare(res.password, result.password, function (err, res) {
                console.log("resu...", res)
                if (err) {
                    console.log("error in model: ", err);

                    callback(err)
                }
                else {
                    //show result if data is correct
                    console.log("Login successfully");
                    callback(null, result);
                }

            })
        }
        else {
            //else print the error message
            console.log("Enter correct data")
            callback(err);
        }
    })

}







