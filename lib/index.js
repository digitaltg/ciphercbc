/*!
 * Copyright (c) 2023 Togo DIgital Agency Inc. All rights reserved.
 */
"use strict";

// translate `main.js` to CommonJS
require = require("esm")(module);
module.exports = require("./main.js");
