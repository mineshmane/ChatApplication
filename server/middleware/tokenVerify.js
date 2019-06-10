
var jwt = require('jsonwebtoken');
var secret = "secretkey";
try {
    exports.checkToken = (req, res, next) => {
        console.log("In authentication");
        var token = req.headers['token'];
        console.log('token in vweryd   '+token);
        
        if (token) {
            //verify the token here
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    // throw if unauthorized error occurs
                    console.log(err)
                    return res.status(401).send({ Response });
                }
                else {
                    //show result
                    console.log("Decoded data" + JSON.stringify(decoded));
                    req.decoded = decoded;
                    next();
                }

            });
        }
        else {
            return res.send({
                success: false,
                message: "token not provide"
            })
        }
    }
}


catch (err) {
    //throw exception
    console.log(" error while generating the token");

}