"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("./address");
const key = "0x97c0d4b2ef92a377430201ac79e1f70cd0a51567133f734c680d893ec46d371e";
const address = (0, address_1.getPublicKeyBs58)(Buffer.from(key));
console.log(address);
const bufs = (0, address_1.fromAddressBytes)(address);
console.log(bufs);
//# sourceMappingURL=address_test.js.map