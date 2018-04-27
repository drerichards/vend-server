const axios = require("axios"),
  { GILT_KEY } = require("../config")

const returnProducts = (res, term1, term2, term3, store) => {
  axios.all([
    axios.get(`https://api.gilt.com/v1/products?q=${term1}&store=${store}&rows=70&apikey=${GILT_KEY}`),
    axios.get(`https://api.gilt.com/v1/products?q=${term2}&store=${store}&rows=70&apikey=${GILT_KEY}`),
    axios.get(`https://api.gilt.com/v1/products?q=${term3}&store=${store}&rows=70&apikey=${GILT_KEY}`)
  ])
    .then(axios.spread((response1, response2, response3) => {
      const combinedResults = [
        ...response1.data.products,
        ...response2.data.products,
        ...response3.data.products
      ]
      res.send(combinedResults)
    })
    ).catch(error => {
      res.status(500).json({ message: "Internal server error" })
    })
}

module.exports = app => {
  app.get("/products/nurbana/furniture", (req, res) => {
    returnProducts(res, "couch", "bed", "armoire", "home")
  })

  app.get("/products/nurbana/kitchen", (req, res) => {
    returnProducts(res, "pasta+pot", "roaster", "tool", "home")
  })

  app.get("/products/nurbana/bedbath/bedding", (req, res) => {
    returnProducts(res, "duvet", "comforter", "sheet+set", "home")
  })

  app.get("/products/nurbana/bedbath/bath", (req, res) => {
    returnProducts(res, "shower", "soap", "washcloth", "home")
  })

  app.get("/products/nurbana/decor", (req, res) => {
    returnProducts(res, "table+lamp", "bowl", "pillow", "home")
  })
}
