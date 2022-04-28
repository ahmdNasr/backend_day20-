const { findAllProducts } = require("../db-access/products-dao");

async function listAllProducts() {
    const products = await findAllProducts()
    const productsView = products.map(p => ({
        _id: p._id,
        title: p.title,
        price: p.price,
        imageLink: p.imageLink,
        isAvailible: p.stockCount > 0,
        isLimited: p.stockCount < 10,
    }))
    return productsView
}

module.exports = {
    listAllProducts
}