const ProductsDAO = require("../db-access/products-dao");
const UsersDAO = require("../db-access/users-dao");
const { makeProduct } = require("../domain/Product");
const { makeUser } = require("../domain/User");

async function addProductToUserWishlist({ userId, productId }) {
    const [foundUser, foundProduct] = await Promise.all([
        UsersDAO.findById(userId),
        ProductsDAO.findById(productId),
    ])
    
    if(!foundUser) {
        throw { message: "User with id " + userId + " was not found!" }
    }

    if(!foundProduct) {
        throw { message: "Product with id " + productId + " doesn't exist!" }
    }

    const user = makeUser(foundUser)
    const product = makeProduct(foundProduct)

    await UsersDAO.updateUserWishlist(user._id, product._id)
    
    const updatedUser = await UsersDAO.findById(userId)
    return updatedUser.wishlist
}

module.exports = {
    addProductToUserWishlist
}