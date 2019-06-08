
var userService = require('../services/userService');
var middleToken=require('../mail/token');
var middleEmail=require('../mail/mail')
module.exports.register = (req, res) => {
  try {
    console.log("in register server controller data is ",req)

    // res.send(req.body)
    userService.register(req, (err, result) => {
      var response = {};
      if (err) {
        //send status as false to show error
        response.success = false;
        response.err = err;
        res.status(400).send(response);
      }
      else {
        //send status as true for successful result
        response.success = true;
        response.result = result;
        res.status(200).send(response);
      }
    })
  }
  catch (err) {
    //handle exception
    res.send(err);
    console.log(" error ",err);
  }
}



module.exports.login = (req, res) => {
  try {
   
    userService.login(req.body, (err, data) => {
      console.log("ctrl 38", req.body);

      if (err) {
        console.log(err)
        console.log("ctrl 41");

        return res.status(500).send({ message: err })
      } else {
        console.log("data login server usercontroller: ", data);

   
        return res.status(200).send({message: data,
         // "token": token
        });
      }
    })

  }
  catch (err) {
    //handle exception
    console.log(" eeror ");

    res.status(500).send(err);
  }

}





module.exports.forgetPassword = (req, res) => {
  req.checkBody("email","not valid ").isEmail();
  //var err=req.validationError();
  try {
    userService.forgetPassword(req, (err, result) => {


      var response = {};
      console.log("forget paswd")
      if (err) {
        //send status as false to show error
        response.success = false;
        response.err = err;
        res.status(400).send(response);

      }
      else {
        //send status as true for successful result
        response.success = true;
        response.result = result;
        //res.status(200).send(response);
        console.log("resr", response)
        const payload = {
          _id: response.result._id
        }
        console.log("uuuuuuu", payload._id)
        console.log("ppppppp", payload)
        //call the function to create a token
        const resObj = middleToken.generateNewToken(payload);
        console.log("Obj", resObj);
        //url for reset password with the generated token
        const url = `http://localhost:3000/#/reset/${resObj.token}`;
        console.log("url", url)
        //call sendMail function
        middleEmail.mail(url);
        res.status(200).send(url);
      }

    })
  }
  catch (err) {
    //handle exception
    req.send(err);
  }
}