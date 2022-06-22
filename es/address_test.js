import { getPublicKeyBs58, fromAddressBytes } from "./address";
const key = "0x97c0d4b2ef92a377430201ac79e1f70cd0a51567133f734c680d893ec46d371e";
const address = getPublicKeyBs58(Buffer.from(key));
console.log(address);
const bufs = fromAddressBytes(address);
console.log(bufs);
//# sourceMappingURL=address_test.js.map