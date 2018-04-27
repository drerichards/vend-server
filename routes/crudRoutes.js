const axios = require('axios')

module.exports = app => {
    const {User} = require('../users/models')

    app.get('/user_purchases/:username', (req, res) => {
        try {
            User.findOne({
                username: req.params.username
            }, (err, items) => {
                if (err) {
                    res.send(err)
                }
                if (!items.user_purchases) {
                    res.send('Sorry! No Purchases to Display')
                }
                res.send(items.user_purchases)
            })
        } catch (error) {
            res.send(error)
        }
    })

    app.post('/user_purchases/add/:username', (req, res) => {
        try {
            User.update({
                username: req.params.username
            }, {
                $addToSet: {
                    user_purchases:  req.body
                }
            }, (err, response) => {
                if (err) {
                    res.send(err)
                }
                res.send(response)
            })
        } catch (error) {
            res.send(error)
        }
    })
}