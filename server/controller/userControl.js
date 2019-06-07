
var userService = require('../services/userService');

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

        console.log('login success')
        return res.status(200).send({
          message: data,
         // "token": token
        });
      }
    })

  }
  catch (err) {
    //handle exception
    console.log(" eeror ");

    res.send(err);
  }

}
