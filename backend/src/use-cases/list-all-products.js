const { findAllProducts } = require("../db-access/products-dao");

function listAllProducts() {
    return findAllProducts()
    .then(products => products.map(p => ({
        _id: p._id,
        title: p.title,
        price: p.price,
        imageLink: p.imageLink,
        isAvailible: p.stockCount > 0,
        isLimited: p.stockCount < 10,
    })))
}

module.exports = {
    listAllProducts
}