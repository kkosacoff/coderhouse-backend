import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
const PORT = 8081
const pm1 = new ProductManager('/products.json')

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.get('/products', async (req, res) => {
  const products = await pm1.getProducts()
  if (req.query.limit) {
    res.send(products.slice(0, req.query.limit))
  } else {
    res.send(products)
  }
})

app.get('/product/:pid', async (req, res) => {
  const product = await pm1.getProductById(req.params.pid)
  console.log(product)
  if (product) {
    res.send(product)
  } else {
    res.send({ msg: `Product ID ${req.params.pid} not found` })
  }
})
