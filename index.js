const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./src/routes");
const bodyParser = require("body-parser");


dotenv.config()

const app = express()
const port = process.env.PORT || 8080
app.use(bodyParser.json())


routes(app);


mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
      console.log('Connect DB success!')
    })
    .catch((err) => {
     console.log(err)
    })


app.listen(port, () => {
  console.log('Server is running in port: ', + port)
})