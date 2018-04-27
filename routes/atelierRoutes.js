const axios = require("axios"),
  { GILT_KEY } = require("../config")

const returnProducts = (res, term1, term2, term3, store) => {
  axios
    .all([
      axios.get(
        `https://api.gilt.com/v1/products?q=${term1}&store=${store}&rows=20&apikey=${GILT_KEY}`
      ),
      axios.get(
        `https://api.gilt.com/v1/products?q=${term2}&store=${store}&rows=20&apikey=${GILT_KEY}`
      ),
      axios.get(
        `https://api.gilt.com/v1/products?q=${term3}&store=${store}&rows=20&apikey=${GILT_KEY}`
      )
    ])
    .then(
      axios.spread((response1, response2, response3) => {
        const combinedResults = [
          ...response1.data.products,
          ...response2.data.products,
          ...response3.data.products
        ]
        res.send(combinedResults)
      })
    )
    .catch(error => {
      res.status(500).json({ message: "Internal server error" })
    })
}

module.exports = app => {
  //womens
  app.get("/products/atelier/womens/tops", (req, res) => {
    returnProducts(res, "top", "blouse", "tee", "women")
  })

  app.get("/products/atelier/womens/rompers", (req, res) => {
    returnProducts(res, "romper", "overall", "jumpsuit", "women")
  })

  app.get("/products/atelier/womens/dresses", (req, res) => {
    returnProducts(res, "dress", "gown", "shirtdress", "women")
  })

  app.get("/products/atelier/womens/denim", (req, res) => {
    returnProducts(res, "legging", "jean", "jeans", "women")
  })

  app.get("/products/atelier/womens/opentoes", (req, res) => {
    returnProducts(res, "sandals", "wedge", "slides", "women")
  })

  app.get("/products/atelier/womens/flats", (req, res) => {
    returnProducts(res, "flats", "loafers", "espadrille", "women")
  })

  app.get("/products/atelier/womens/heels", (req, res) => {
    returnProducts(res, "pumps", "heels", "high+heel", "women")
  })

  app.get("/products/atelier/womens/perfume", (req, res) => {
    returnProducts(res, "parfum", "toilette", "jimmy+choo+spray", "women")
  })

  //mens
  app.get("/products/atelier/mens/tees", (req, res) => {
    returnProducts(res, "tank+top", "t-shirt", "tee", "men")
  })
  app.get("/products/atelier/mens/shirts", (req, res) => {
    returnProducts(res, "polo", "sportshirt", "dress+shirt", "men")
  })
  app.get("/products/atelier/mens/outerwear", (req, res) => {
    returnProducts(res, "hoodies", "sweater", "jacket", "men")
  })
  app.get("/products/atelier/mens/pants", (req, res) => {
    returnProducts(res, "jeans", "joggers", "pants", "men")
  })
  app.get("/products/atelier/mens/boots", (req, res) => {
    returnProducts(res, "boots", "boot", "monkstrap", "men")
  })
  app.get("/products/atelier/mens/sneakers", (req, res) => {
    returnProducts(res, "sneakers", "trainer", "hi+top", "men")
  })
  app.get("/products/atelier/mens/casual", (req, res) => {
    returnProducts(res, "espadrille", "sandals", "drivers", "men")
  })
  app.get("/products/atelier/mens/eyewear", (req, res) => {
    returnProducts(res, "tinted", "aviator", "wayfarer", "men")
  })
}
