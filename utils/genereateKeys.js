var pbkdf2 = require("pbkdf2");
var crypto = require("crypto");


const genKey = () => {
    const password = "'JO!pN(N8+KH1#'c^3=8F~U[aO-}QUJx6b#'3'.'XlWRQ)L8n;";
    const salt = "FMXcHadURYjG61xtaMz5wHR";

    var key_256 = pbkdf2.pbkdf2Sync(password, salt, 1, 256 / 8, "sha512");
    console.log("Key\n", key_256.toString("hex"));
};

const genIv = () => {
    const lr = crypto.randomBytes(16);
    console.log("Iv");
    console.log(lr.toString("hex"));
}

genKey();
genIv();


module.exports = {
    genKey, genIv
};
