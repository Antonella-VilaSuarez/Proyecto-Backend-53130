import fs from 'fs/promises';
import { existsSync } from 'fs';

class ProductManager {
  static idCounter = 0;

  constructor(path) {
    this.path = path;
  }

  async readFile() {
    return await fs.readFile(this.path, 'utf-8');
  }

  async writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, '\t'), 'utf-8');
  }

  async getProducts() {
    try {
      return existsSync(this.path)
        ? JSON.parse(await this.readFile())
        : [];
    } catch (error) {
      console.error('Error al recuperar datos:', error);
      return [];
    }
  }

  async addProduct(product) {
    if (!['title', 'description', 'price', 'thumbnail', 'code', 'stock'].every(
      k => product.hasOwnProperty(k)
    )) {
      console.log('Informacion incompleta');
      return;
    }

    const products = await this.getProducts();
    if (products.some(p => p.code === product.code)) {
      console.log('Codigo repetido');
      return;
    }

    // Uso operador de propagacion para los ID
    ProductManager.idCounter = Math.max(...products.map(p => p.id)) + 1;

    const newProduct = { id: ProductManager.idCounter, ...product };
    products.push(newProduct);
    await this.writeFile(products);
    console.log('Producto agregado');
    return newProduct;
  }

  async getProductById(idProduct) {
    const foundProduct = await this.getProducts().find(p => p.id === idProduct);
    if (!foundProduct) {
      console.error(`Producto no encontrado con ID: ${idProduct}`);
    }
    return foundProduct;
  }


  async deleteProduct(idProduct) {
    const foundProduct = await this.getProductById(idProduct);
    if (!foundProduct) return;

    const products = await this.getProducts();
    await this.writeFile(
      products.filter(p => p.id !== idProduct)
    );
    console.log('Producto eliminado');
    return foundProduct;
  }
}

export default ProductManager;
