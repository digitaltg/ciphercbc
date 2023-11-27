import aesjs from 'aes-js';


/**
 * 
 * @param {Buffer} key
 * @param {BUffer} iv
 * @param {string} data
 * @returns {string} encrypted the hex format of the encrypted data
 */
function encrypt(key, iv, data) {
    //Encode data to base64
    //To avoid accent data
    data = Buffer.from(data, 'utf8').toString("base64");

    //[START] Add pointer
    const length = data.length;
    data += "#".repeat((16 - (length % 16)) % 16);
    //[END]

    const dataBytes = aesjs.utils.utf8.toBytes(data);

    var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    var encryptedBytes = aesCbc.encrypt(dataBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

/**
 * 
 * @param {BUffer} key 
 * @param {Buffer} iv
 * @param {string} encrypted in hex digest
 * @return string
 */
function decrypt(key, iv, encrypted) {
    var encryptedBytes = aesjs.utils.hex.toBytes(encrypted);

    var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    var decryptedBytes = aesCbc.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

    //[START] Remove pointer
    const arr = decryptedText.split("");
    for (let index = arr.length - 1; index >= 0; index--) {
        if (arr[index] == "#") {
            arr[index] = null;
        } else {
            break;
        }
    }

    decryptedText = arr.filter((v) => v != null).join("");
    //[END]

    //Decode from base64
    decryptedText = Buffer.from(decryptedText, 'base64').toString();
    decryptedBytes = aesjs.utils.utf8.toBytes(decryptedText);

    return { text: decryptedText, byte: decryptedBytes };
}

/**
 * 
 * @param {Buffer} key 
 * @param {Buffer} iv 
 * @returns 
 */
export function cipher(key, iv) {
    return {
        /**
         * 
         * @param {string} plain 
         */
        encrypt: (plain) => {
            return encrypt(key, iv, plain);
        },

        /**
         * 
         * @param {string} encrypted in hex format
         */
        decrypt: (encrypted) => {
            //TODO: control if the string is in Hex format
            return decrypt(key, iv, encrypted);
        }

    }
}