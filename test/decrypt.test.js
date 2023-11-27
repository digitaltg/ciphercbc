const { before, describe, it } = require("mocha");
const { cipher } = require("../lib/index");
const TESTS_KEYS = require("./keys");
const { assert } = require("chai");


describe("Decrypt data", () => {
    let cph = null;

    before(() => {
        cph = cipher(Buffer.from(TESTS_KEYS.Key, 'hex'), Buffer.from(TESTS_KEYS.Iv, "hex"));
    });

    after(() => {
        cph = null;
    });

    it("Should decrypt", () => {
        assert.isNotNull(cph);
        const plainText = "plainText";
        const res = cph.encrypt(plainText);
        
        //Decrypt
        const decoded = cph.decrypt(res);
        
        assert.isDefined(decoded.text);
        assert.equal(decoded.text, plainText);
    })
})