const { before, describe, it } = require("mocha");
const { cipher } = require("../lib/index");
const TESTS_KEYS = require("./keys");
const { assert } = require("chai");


describe("Encrypt data", () => {
    let cph = null;

    before(() => {
        cph = cipher(Buffer.from(TESTS_KEYS.Key, 'hex'), Buffer.from(TESTS_KEYS.Iv, "hex"));
    });

    after(() => {
        cph = null;
    });

    it("Should encrypt", () => {
        assert.isNotNull(cph);
        const plainText = "plainText";
        const res = cph.encrypt(plainText);
        assert.equal(res, "a1a84bc4c7fd2dc97518f12b95625380");
    })
})