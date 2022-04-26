const { findUserByEmail, insertOne } = require("../db-access/users-dao");
const { makeUser } = require("../domain/User");

function registerUser(userInfo) {
    return new Promise((resolve, reject) => {

        return findUserByEmail(userInfo.email)
        .then(foundUser => {
            if(foundUser) {
                reject({ message: "User with email " + userInfo.email + " already exists." })
                return
            }

            const user = makeUser(userInfo)
            return insertOne(user)
        })
        .then((updateResult) => resolve(updateResult))
    })
    
}

module.exports = {
    registerUser
}