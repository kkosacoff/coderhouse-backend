import fs from 'fs'

export default class ProductManager {
  static globalId = 0 // product code number global tracker

  constructor(filename) {
    this.products = [] // initialize empty array
    this.path = './files'
    this.filename = this.path + filename
  }

  // Class Methods

  addProduct = async (title, desc, price, thumbnail, code, stock) => {
    // Creating dir if not created yet
    await fs.promises.mkdir(this.path, { recursive: true })

    // Read file and assign it to class array
    // await this.getProducts((res) => {
    //   this.products = res
    // })

    // Write the file
    if (!(title, desc, price, thumbnail, code, stock)) {
      // check that all params exist
      console.log('Missing parameter')
    } else if (this.products.find((prod) => prod.code == code)) {
      console.log('Product with that ID already exists')
    } else {
      const prodId = ProductManager.globalId++ // Add 1 to the code static variable
      this.products.push({
        // add items to array
        title,
        desc,
        price,
        thumbnail,
        code,
        stock,
        prodId,
      })
      await fs.promises.writeFile(this.filename, JSON.stringify(this.products))
      console.log('Product added succesfully')
    }
  }

  getProducts = async () => {
    // Read the file and convert to JS Object
    let result = await fs.promises.readFile(this.filename)
    let parsedRes = await JSON.parse(result)
    console.log('Reading file')
    return parsedRes
  }

  getProductById = async (id) => {
    let result = await fs.promises.readFile(this.filename)
    let parsedRes = await JSON.parse(result)

    const filteredArr = parsedRes.find(
      // compare id param vs id from products array
      (product) => product.prodId == id
    )
    return filteredArr ? filteredArr : ''
  }

  updateProductById = async (id, updatedData) => {
    let result = await fs.promises.readFile(this.filename)
    let parsedRes = await JSON.parse(result)

    if (await this.getProductById(id)) {
      const newArr = parsedRes.map((item) => {
        return id == item.prodId ? { ...item, ...updatedData } : item
        console.log('Product updated succesfully')
      })
      await fs.promises.writeFile(this.filename, JSON.stringify(newArr))
    } else {
      console.log(`Product ID ${id} does not exist`)
    }
  }

  deleteProductById = async (id) => {
    let result = await fs.promises.readFile(this.filename)
    let parsedRes = await JSON.parse(result)

    if (await this.getProductById(id)) {
      const newArr = parsedRes.filter((item) => item.prodId !== id)
      await fs.promises.writeFile(this.filename, JSON.stringify(newArr))
      console.log('Product deleted succesfully')
    } else {
      console.log(`Product ID ${id} does not exist`)
    }
  }
}

// const pm1 = new ProductManager('/products.json')

// pm1.addProduct(
//   'Guitarra',
//   'Es una guitarra',
//   10,
//   'www.guitarra.com',
//   'ABC123',
//   100
// )
// pm1.addProduct(
//   'Bateria',
//   'Es una bateria',
//   20,
//   'www.bateria.com',
//   'BCD234',
//   200
// )

// // pm1.deleteProductById(1)
