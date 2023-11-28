# Cipher Block Chaining

An encryption library using cipher block chaining. This wrapper the CBC functionnality of the aes-js library

# Install

```sh
npm install
```

# Usage

We need to generate the differents keys. It is possible to use a tool already included in the project

```javascript
node utils/generateKeys.js
```

```javascript
const TESTS_KEYS = {
    Key: "bbf3e354dbe8d1c92b748e8f67338a3f130aeda4796b702ad3043556e5ac2768",
    Iv: "e9211923c55ce6d82603098cd21437d2"
}
```

Import the cipher function and

```javascript
const cph = cipher(Buffer.from(TESTS_KEYS.Key, 'hex'), Buffer.from(TESTS_KEYS.Iv, "hex"));
```

```javascript
const plainText = "plainText";

//Encrypt
const res = cph.encrypt(plainText);
        
//Decrypt
const decoded = cph.decrypt(res);

```

Encrypt Result
```bash
a1a84bc4c7fd2dc97518f12b95625380
```