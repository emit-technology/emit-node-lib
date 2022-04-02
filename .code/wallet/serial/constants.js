import * as ed from "@noble/ed25519";
export var BYTES_MAX_LEN = 4 * 1024 * 1024;
export var VEC_T_MAX_LEN = 1 * 1024 * 1024;
export var ADDRESS_BYTES_LEN = 36;
export var ADDRESS_BYTES_PREFIX = "1e";
export var EMIT_ADDR_BS_H0 = "EM_ADDR_BS_H0";
export var EMIT_ADDR_BS_H1 = "EM_ADDR_BS_H1";
export var ED_BASE = ed.RistrettoPoint.fromHex("e2f2ae0a6abc4e71a884a961c500515f58e30b6aa582dd8db6a65945e08d2d76");
//
// fromAffine().ExtendedPoint.fromRistrettoBytes(
//   Buffer.from(
//     "e2f2ae0a6abc4e71a884a961c500515f58e30b6aa582dd8db6a65945e08d2d76",
//     "hex"
//   )
// );
//# sourceMappingURL=constants.js.map