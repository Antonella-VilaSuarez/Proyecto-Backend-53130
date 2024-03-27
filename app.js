import ProductManager from './managers/ProductManager.js'
import express from 'express'

const PORT = 8080

//Se crea una instancia de la clase “ProductManager”
const manager = new ProductManager('./src/data/Products.json')
const app = express()

app.get('/products', async (req, res) => {
  const products = await manager.getProducts()
  const { limit } = req.query
  console.log(+limit)
  if (!limit) {
    return res.status(200).send({
      message: `Productos encontrados`,
      data: products,
    })
  }
  if (+limit > products.length || isNaN(limit) || +limit === 0) {
    return res.status(200).send({
      error:
        +limit > products.length || +limit === 0
          ? `Productos encontrados`
          : `'${limit}' --> Datos no válidos`,
    })
  }
  const limitProducts = products.slice(0, +limit)
  return res.status(200).send({
    message: `Estos son los ${limit} productos encontrados`,
    data: limitProducts,
  })
})

app.get('/products/:id', async (req, res) => {
  const products = await manager.getProducts()
  const { id } = req.params
  console.log(id)
  const product = await manager.getProductById(+id)
  if (!product) {
    return res.status(200).send({
      error:
        +id > products.length
          ? `El producto con ID: ${id} no existe`
          : `'${id}' --> Datos no válidos`,
    })
  }
  return res.status(200).send({
    message: `Producto encontrado con ID ${id}`,
    data: product,
  })
})

app.listen(PORT, () => {
  console.log(`Escuchando en PUERTO => ${PORT}`)
})
const io = socket(httpserver); 