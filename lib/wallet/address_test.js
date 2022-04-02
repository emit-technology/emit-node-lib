"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./address");
const key = "0x97c0d4b2ef92a377430206ac79e1f70cd0a51567133f734c680d893ec46d371e";
const address = (0, address_1.getPublicKeyBs58)(Buffer.from(key));
console.log(address);
//# sourceMappingURL=address_test.js.map