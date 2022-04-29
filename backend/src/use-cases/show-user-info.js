const { findById } = require("../db-access/users-dao")

async function showUserInfo({ userId }) {
    const foundUser = await findById(userId)
    if(!foundUser) {
        throw new Error("User doesn't exist anymore!")
    }

    return {
        name: foundUser.name,
        email: foundUser.email,
        wishlist: foundUser.wishlist,
        _id: foundUser._id
    }
}

module.exports = {
    showUserInfo
}