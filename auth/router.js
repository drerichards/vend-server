'use strict'
const express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    router = express.Router()

const createAuthToken = function (user) {
    return jwt.sign({ user }, config.JWT_SECRET, { //create JWT with user info and secret
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256' //signs token
    })
}

const localAuth = passport.authenticate('local', { session: false })
router.use(bodyParser.json())
// The user provides a username and password to login
//make a POST request to /api/auth/login to obtain a JWT
//endpoint is protected using the passport local auth strategy
router.post('/login', localAuth, (req, res) => {
    const authToken = createAuthToken(req.user.serialize())
    //as a response we get some JSON containing our JWT
    res.json({ authToken })
})

const jwtAuth = passport.authenticate('jwt', { session: false })

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
    const authToken = createAuthToken(req.user)
    res.json({ authToken })
})

module.exports = { router }
