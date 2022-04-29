function productToProductView(product) {
    return {
        _id: product._id,
        title: product.title,
        price: product.price,
        imageLink: product.imageLink,
        isAvailible: product.stockCount > 0,
        isLimited: product.stockCount < 10,
    }
}

module.exports = {
    productToProductView
}