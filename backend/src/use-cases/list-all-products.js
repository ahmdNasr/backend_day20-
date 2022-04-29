const { findAllProducts } = require("../db-access/products-dao");
const { productToProductView } = require("./helpers/functions");

async function listAllProducts() {
    const products = await findAllProducts()
    const productsView = products.map(productToProductView)
    return productsView
}

module.exports = {
    listAllProducts
}