const ProductsDAO = require("../db-access/products-dao");
const UsersDAO = require("../db-access/users-dao");
const { makeProduct } = require("../domain/Product");
const { makeUser } = require("../domain/User");

function addProductToUserWishlist({ userId, productId }) {
    return new Promise((resolve, reject) => {
        Promise.all([
            UsersDAO.findById(userId),
            ProductsDAO.findById(productId),
        ]).then(([foundUser, foundProduct]) => {
            if(!foundUser) {
                reject({ message: "User with id " + userId + " was not found!" })
                return
            }
    
            if(!foundProduct) {
                reject({ message: "Product with id " + productId + " doesn't exist!" })
                return
            }
    
            const user = makeUser(foundUser)
            const product = makeProduct(foundProduct)
    
            return { user, product}
        })
        .then(({ user, product }) => UsersDAO.updateUserWishlist(user._id, product._id))
        .then(resolve)
    })
}

module.exports = {
    addProductToUserWishlist
}