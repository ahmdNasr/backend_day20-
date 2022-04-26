const crypto = require("crypto");

function hash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

function createRandomSalt() {
    return crypto.randomBytes(64).toString('hex');
}

module.exports = {
    hash,
    createRandomSalt
}

// Rainbow Table: Hash <--> Passwort <--> Hash Algo
// Hallo + ???
// 753692ec36adb4c794c973945eb2a99c1649703ea6f76bf259abb4fb838e013e

// x09309309ü13i13üi1  <-- Hallo1309üj1093rj0ü913jr
// 9835u9p24up9813u91  <-- Hallo092409498u24pui2p33

// Hallo Welt!
// a582e8c28249fe7d7990bfa0afebd2da9185a9f831d4215b4efec74f355b301a

// 1. Besonderheit: Einwegfunktion aka. Umkehrfunktion ist schwer zu berechenen
// 2. Besonderheit: Gleicher input --> gleicher output
// 3. Besonderheit: Chaos --> minimale Änderung im Input --> fatalen Effekt/Änderung im Output
