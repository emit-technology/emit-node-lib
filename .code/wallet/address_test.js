import { getPublicKeyBs58, fromAddressBytes } from "./address";
var key = "0x97c0d4b2ef92a377430201ac79e1f70cd0a51567133f734c680d893ec46d371e";
var address = getPublicKeyBs58(Buffer.from(key));
console.log(address);
var bufs = fromAddressBytes(address);
console.log(bufs);
//# sourceMappingURL=address_test.js.map