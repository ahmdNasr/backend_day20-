const { createRandomSalt, createPasswordHash } = require("../utils/hash")

function makeUser({ _id, name, email, wishlist, createdAt, password, passwordHash, passwordSalt, role = "user" }) {
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error("User name must be a non-empty string")
    }

    if(!passwordHash && !password) {
        throw new Error("User must provide a password or passwordHash")
    }

    const _pwSalt = passwordSalt || createRandomSalt()

    return {
        name,
        email,
        wishlist: wishlist || [], // leere wishlist als standard-wert für neue user...
        createdAt: createdAt || Date.now(),
        passwordHash: passwordHash || createPasswordHash(password, _pwSalt),
        passwordSalt: _pwSalt,
        _id,
    }
}

module.exports = {
    makeUser
}