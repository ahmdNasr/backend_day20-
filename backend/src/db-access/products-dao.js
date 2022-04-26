const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

function findAllProducts() {
    return getDB().then(db => db.collection("products").find().toArray())
}

function findById(id) {
    return getDB().then(db => db.collection("products").findOne({ _id: new ObjectId(id) }))
}

function insertOne(product) {
    return getDB().then(db => db.collection("products").insertOne(product))
}

module.exports = {
    findAllProducts,
    findById,
    insertOne
}