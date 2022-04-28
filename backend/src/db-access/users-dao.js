const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")

async function findById(id) {
    const db = await getDB()
    const foundUser = await db.collection("users").findOne({ _id: new ObjectId(id) })
    return foundUser
}

async function findUserByEmail(email) {
    const db = await getDB()
    const user = await db.collection("users").findOne({ email: email })
    return user
}

async function insertOne(user) {
    const db = await getDB()
    const insertResult = await db.collection("users").insertOne(user)
    return insertResult
}

async function updateUserWishlist(userId, productId) {
    const db = await getDB()
    // man muss den wert nicht immer await-en, außer man will damit in der funktion weiter arbeiten...
    // man kann auch direkt return-en, wie hier:
    return db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $push: { wishlist: productId } }
    )
}

module.exports = {
    findById,
    findUserByEmail,
    insertOne,
    updateUserWishlist
}