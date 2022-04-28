const { findUserByEmail } = require("../db-access/users-dao");
const { makeUser } = require("../domain/User");
const { createPasswordHash, createToken } = require("../utils/hash");

async function login({ email, password }) {
    // step 1 - gibts die den user mit dieser email adresse überhaupt
    // step 2 - password prüfen
    // step 3.error - error schicken, wenn das password nicht stimmt
    // step 3.success - token erzeugen und verschicken (wenn beides okay)
    
    const invalidLoginMsg = "Invalid login."
    
    // step 1 - gibts die den user mit dieser email adresse überhaupt
    const foundUser = await findUserByEmail(email)
    if(!foundUser) {
        throw new Error(invalidLoginMsg)
    }

    // step 2 - password prüfen
    const user = makeUser(foundUser)
    const passwordHash = createPasswordHash(password, user.passwordSalt)
    const correctPassword = user.passwordHash === passwordHash
    if(!correctPassword) {
        // step 3.error - error schicken, wenn das password nicht stimmt
        throw new Error(invalidLoginMsg)
    }

    // SUCCESS --->
    // step 3.success - token erzeugen und verschicken (wenn beides okay)
    const token = createToken(user)
    return token
}

module.exports = {
    login
}