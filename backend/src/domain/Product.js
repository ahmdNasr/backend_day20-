
/*
    {
        title: "Hemd",
        description: "Ultra feine baumwolle, 100%, ...",
        price: 79,
        variation: ["S", "M", "L", "XL"],  // variation: ["red-blue", "black-white", "violett-green"],
        imageLink: "http://...",
        stockCount: 100 // es gibt noch 100 stück davon
    }
*/

function makeProduct({ _id, title, description, price, variations, imageLink, stockCount, createdAt }) {
    if(!Array.isArray(variations)) {
        throw new Error("Product variations must be an array.")
    }
    // ... prüfungen

    return { 
        title: title || "New Product",
        description,
        price,
        variations, // : variations || [],
        imageLink: imageLink || "https://speisekartenweb.de/restaurants/restaurantseite/assets/restaurant_placeholder.png",
        stockCount,
        createdAt: createdAt || Date.now(), // standard-wert
        _id
    }
}

module.exports = {
    makeProduct
}