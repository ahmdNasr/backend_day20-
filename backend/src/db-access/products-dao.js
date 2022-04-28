const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

async function findAllProducts() {
    const db = await getDB()
    const products = await db.collection("products").find().toArray()
    return products
}

async function findById(id) {
    const db = await getDB()
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) })
    return product
}

async function insertOne(product) {
    const db = await getDB()
    const result = await db.collection("products").insertOne(product)
    return result
}

module.exports = {
    findAllProducts,
    findById,
    insertOne
}