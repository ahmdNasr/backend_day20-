const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

function findById(id) {
    return getDB().then(db => db.collection("users").findOne({ _id: new ObjectId(id) }))
}

function findUserByEmail(email) {
    return getDB().then(db => db.collection("users").findOne({ email: email }))
}

function insertOne(user) {
    return getDB().then(db => db.collection("users").insertOne(user))
}

function updateUserWishlist(userId, productId) {
    return getDB().then(db => 
        db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            { $push: { wishlist: productId } }
        ))
}

module.exports = {
    findById,
    findUserByEmail,
    insertOne,
    updateUserWishlist
}