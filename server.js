"use strict"
require("dotenv").config()
const express = require("express"),
  cors = require("cors"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  morgan = require("morgan"),
  { DATABASE_URL, PORT } = require("./config")
const { router: usersRouter } = require("./users")
const { router: authRouter, localStrategy, jwtStrategy } = require("./auth")

app.use(cors())
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   )
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   )
//   next()
// })

app.use(morgan("dev"))
app.use(bodyParser.json())
mongoose.Promise = global.Promise
mongoose.connect(DATABASE_URL)
mongoose.connection.once("open", () => {
    console.log("Mongo Connection Opened!")
  }).on("error", error => console.warn("Warning ", error))

passport.use(localStrategy)
passport.use(jwtStrategy)

app.use("/api/users/", usersRouter)
app.use("/api/auth/", authRouter)
const jwtAuth = passport.authenticate("jwt", { session: false })
require("./routes/atelierRoutes")(app)
require("./routes/poketoRoutes")(app)
require("./routes/nurbanaRoutes")(app)
require("./routes/paymentRoutes")(app)
require("./routes/crudRoutes")(app)

app.use("*", (req, res) => {
  return res.status(404).json({ message: "Not Found" })
})

const logErrors = (err, req, res, next) => {
  console.error(err.stack)
  return res.status(500).json({ error: "Something went wrong" })
}

app.use(logErrors)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
module.exports = { app }