const cors = require("cors")
const morgan = require("morgan")
const express = require("express")

const { listAllProducts } = require("./use-cases/list-all-products")
const { showProduct } = require("./use-cases/show-product")
const { createNewProduct } = require("./use-cases/create-new-product")
const { registerUser } = require("./use-cases/register-user")
const { addProductToUserWishlist } = require("./use-cases/add-product-to-user-wishlist")
const { login } = require("./use-cases/login-user")
const { doAuthMiddleware } = require("./auth/auth-middleware")

const PORT = process.env.PORT || 1818
const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("it works :)")
})

app.get("/api/products/all", function getAllProductsController(_, res) {
    const handleError = error => res.status(500).json({ err: error.message || "Unknown error while reading products." })
    
    try {
        listAllProducts()
        .then(products => res.json(products))
        .catch(handleError) 
    } catch (err) {
        handleError(err)
    }
})

app.get("/api/products/single/:id", (req, res) => {
    const handleError = (error) => res.status(500).json({ err: error.message || "Unknown error while reading product." })
    
    try {
        const id = req.params.id

        showProduct({ productId: id })
        .then(product => res.json(product))
        .catch((err) => handleError(err)) 
    } catch (err) {
        handleError(err)
    }
})

app.post("/api/products/add", doAuthMiddleware, (req, res) => {
    const handleError = error => res.status(500).json({ err: error.message || "Unknown error while creating new product." })
    try {
        const productInfo = req.body

        createNewProduct(productInfo)
        .then(product => res.json(product))
        .catch(handleError) 
    } catch (err) {
        handleError(err)
    }
})

app.post("/api/users/register", (req, res) => {
    const handleError = error => res.status(500).json({ err: error.message || "Unknown error while registering new user." })
    
    try {
        const userInfo = req.body

        registerUser(userInfo)
        .then(user => res.json(user))
        .catch(handleError) 
    } catch (err) {
        handleError(err)
    }
})

app.post("/api/users/login", (req, res) => {
    const handleError = error => {
        console.log(error)
        res.status(404).json({ err: "Not found." }) // Pretend to know nothing ;)
    }

    try {
        const email = req.body.email
        const password = req.body.password

        login({ email, password })
        .then((token) => res.json({ token }))
        .catch(handleError)
    } catch (err) {
        handleError(err)
    }
})

app.post("/api/users/addToWishlist", doAuthMiddleware, (req, res) => {
    const handleError = error => res.status(500).json({ err: error.message || "Unknown error while adding product to user whishlist." })
    try {
        const userId = req.userClaims.sub // req.body.userId
        const productId = req.body.productId

        addProductToUserWishlist({ userId, productId })
        .then(wishlist => res.status(201).json({ wishlist }))
        .catch(handleError) 
    } catch(err) {
        handleError(err)
    }
})

app.listen(PORT, () => console.log("Server listening on port", PORT))


// SchichtenArchitektur <-----> Layerd Architecture
// [API]
//  |
//  v 
// Controller (Presentation Layer) <--> http requests, responses (http method, url bzw. routes, parameter, query, body, parsen, format ....)
//  |
//  v 
// Facade Layer <--> Daten validieren --- express-validator (firstname, lastname, email, password) 
//  |
//  v
// Service Layer / Use Case <--> Business Logik
//  |    |
//  |    v
//  |   Domain Layer <--> Users, Posts, Comments, ... objekte sind hier definiert...
//  |
//  v
// Datenbank-Access bzw. File-System-Access (Persistence Layer / Infrastructre Layer) bzw. externer Service (zb Amazon S3, nodemailer verschickt emails, ....)