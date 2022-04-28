const { insertOne } = require("../db-access/products-dao")
const { makeProduct } = require("../domain/Product")

async function createNewProduct(productInfo) {
    const product = makeProduct(productInfo)
    
    const insertResult = await insertOne(product)
    return insertResult
}

module.exports = {
    createNewProduct
}