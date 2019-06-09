
const jwt = require('jsonwebtoken');
module.exports = {
  generateNewToken(payload) {
    const token = jwt.sign({ payload }, 'secretkey', { expiresIn: 1440 })
    const Obj = {
      success: true,
      message: "Token Genereted",
      token: token
    }
    return Obj;
  }
}