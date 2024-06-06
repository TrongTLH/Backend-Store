const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./jwtService")

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const {name, email, password, confirmPassword, phone} = newUser
    try{
      const checkUser = await User.findOne({
        email: email
      })
      if(checkUser !== null){
      resolve({
    status: 'OK',
    message: 'The email is already'
    })
  }
    const hash = bcrypt.hashSync(password, 10)
    // console.log('hash', hash)
      const createUser = await User.create({
        name,
        email,
        password: hash,
        confirmPassword: hash,
        phone
      })
      if(createUser) {
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: createUser
        })
      }
    }catch (e) {
      reject(e)
    }
  })
}


const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const {name, email, password, confirmPassword, phone} = userLogin
    try{
      const checkUser = await User.findOne({
        email: email
      })
      if(checkUser === null) {
      resolve({
          status: 'OK',
          message: 'The user is not define'
    })
   } 
   const comparePassword = bcrypt.compareSync(password, checkUser.password)
   console.log('comparePassword', comparePassword)
      
        if(!comparePassword) {
          resolve({
            status: 'OK',
            message: 'The password or user is in correct'
          })
        }
        const access_token = await generalAccessToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin
        })
        const refresh_token = await generalRefreshToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin
        })

        // console.log('access_token', access_token)
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          access_token,
          refresh_token
        })
      
    }catch (e) {
      reject(e)
    }
  })
}

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try{
      const checkUser = await User.findOne({
        _id: id
      })
      console.log('checkUser', checkUser)
  
      if(checkUser === null) {
      resolve({
          status: 'OK',
          message: 'The user is not define'
    })
   } 
  
   const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
   console.log('updatedUser', updatedUser)
        resolve({
          status: 'OK',
          message: 'SUCCESS',
          data: updatedUser
        })
      
    }catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  createUser,
  loginUser,
  updateUser
}