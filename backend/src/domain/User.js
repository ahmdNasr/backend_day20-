const { hash, createRandomSalt } = require("../utils/hash")

function makeUser({ _id, name, email, whishlist, createdAt, password, passwordHash, passwordSalt }) {
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error("User name must be a non-empty string")
    }

    // if (!Array.isArray(whishlist)) {
    //     throw new Error("User whishlist must be an array of product ids.")
    // }

    if(!passwordHash && !password) {
        throw new Error("User must provide a password or passwordHash")
    }

    const _pwSalt = passwordSalt || createRandomSalt()

    return {
        name,
        email,
        whishlist: whishlist || [], // leere whishlist als standard-wert für neue user...
        createdAt: createdAt || Date.now(),
        passwordHash: passwordHash || hash(password + _pwSalt),
        passwortSalt: _pwSalt,
        _id,
    }
}

module.exports = {
    makeUser
}