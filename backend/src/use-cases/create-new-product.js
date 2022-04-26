const { insertOne } = require("../db-access/products-dao")
const { makeProduct } = require("../domain/Product")

function createNewProduct(productInfo) {
    const product = makeProduct(productInfo)

    return insertOne(product)
}

module.exports = {
    createNewProduct
}