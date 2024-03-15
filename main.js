import ProductManager from './managers/ProductManager.js';

// Instancia de ProductManager
const manager = new ProductManager('./src/data/Products.json');

// Función de prueba
async function testing() {
  try {
    // Obtener productos (debe devolver un arreglo vacío [])
    console.log(await manager.getProducts());

    // Agregar un nuevo producto
    const newProduct = {
      title: 'Producto Prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'XFR555',
      stock: 65,
    };
    await manager.addProduct(newProduct);

    // Obtener productos nuevamente (debe incluir el producto nuevo)
    console.log(await manager.getProducts());

    // Obtener producto por ID (si no existe, debe mostrar un error)
    console.log(await manager.getProductById(1)); // Si existe el ID 1
    console.log(await manager.getProductById(11)); // No existe el ID 11

    // Actualizar un producto (no se debe eliminar el ID)
    console.log(
      await manager.updateProduct(10, {
        title: 'Producto modificado',
        description: 'Este es un producto prueba modificado',
      })
    ); // ID 10 no existe

    console.log(
      await manager.updateProduct(2, {
        title: 'Producto modificado',
        description: 'Este es un producto prueba modificado',
      })
    ); // Se actualiza el producto con ID 2

    // Eliminar un producto
    console.log(await manager.deleteProduct(4));
  } catch (error) {
    console.log(`Error desde el testing de index.js: ${error}`);
  }
}

testing();
