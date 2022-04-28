const { findUserByEmail, insertOne } = require("../db-access/users-dao");
const { makeUser } = require("../domain/User");

async function registerUser(userInfo) {
    const foundUser = await findUserByEmail(userInfo.email)
    if(foundUser) {
        throw { message: "User with email " + userInfo.email + " already exists." }
    }

    const user = makeUser(userInfo)
    const updateResult = await insertOne(user)
    return updateResult
}

module.exports = {
    registerUser
}