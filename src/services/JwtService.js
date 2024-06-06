const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const generalAccessToken = (payload) => {
  // console.group('payload', payload)
  const access_token = jwt.sign({
      payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '1h'})

      return access_token

}

const generalRefreshToken = (payload) => {
  // console.group('payload', payload)
  const refresh_token = jwt.sign({
      payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})
      return refresh_token

}

module.exports = {
  generalAccessToken,
  generalRefreshToken
}