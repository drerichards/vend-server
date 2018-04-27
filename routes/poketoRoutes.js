const axios = require("axios"),
  { WALMART_KEY } = require("../config")

const returnProducts = (res, term1, term2, id) => {
  axios
    .all([
      axios.get(
        `https://api.walmartlabs.com/v1/search?query=${term1}&format=json&categoryId=${id}&apiKey=${WALMART_KEY}`
      ),
      axios.get(
        `https://api.walmartlabs.com/v1/search?query=${term2}&format=json&categoryId=${id}&apiKey=${WALMART_KEY}`
      )
    ])
    .then(
      axios.spread((response1, response2) => {
        const combinedResults = [
          ...response1.data.items,
          ...response2.data.items
        ]
        res.send(combinedResults)
      })
    )
    .catch(error => {
      res.status(500).json({ message: "Internal server error" })
    })
}

module.exports = app => {
  app.get("/products/poketo/tvs", (req, res) => {
    returnProducts(res, "smart+tv", "4k+tv", 3944)
  })

  app.get("/products/poketo/computers", (req, res) => {
    returnProducts(res, "macbook", "laptop", 3944)
  })

  app.get("/products/poketo/videogames/ps4", (req, res) => {
    returnProducts(res, "playstation+4", "playstation+4+games", 2636)
  })

  app.get("/products/poketo/videogames/xboxone", (req, res) => {
    returnProducts(res, "xbox+one", "xbox+one+games", 2636)
  })

  app.get("/products/poketo/videogames/switch", (req, res) => {
    returnProducts(res, "nintendo+switch", "nintendo+switch+games", 2636)
  })

  app.get("/products/poketo/tablets", (req, res) => {
    returnProducts(res, "ipad", "tablet", 3944)
  })

  app.get("/products/poketo/wearables/smartwatch", (req, res) => {
    returnProducts(res, "apple+watch", "smart+watch", 3944)
  })

  app.get("/products/poketo/wearables/headphones", (req, res) => {
    returnProducts(res, "headphones", "buds", 3944)
  })

  app.get("/products/poketo/wearables/activitytracker", (req, res) => {
    returnProducts(res, "fitbit", "activity+tracker", 3944)
  })
}
