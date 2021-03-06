"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ED_BASE = exports.EMIT_ADDR_BS_H1 = exports.EMIT_ADDR_BS_H0 = exports.ADDRESS_BYTES_PREFIX = exports.ADDRESS_BYTES_LEN = exports.VEC_T_MAX_LEN = exports.BYTES_MAX_LEN = void 0;
var tslib_1 = require("tslib");
var ed = tslib_1.__importStar(require("@noble/ed25519"));
// import * as ed from "ed25519";
exports.BYTES_MAX_LEN = 4 * 1024 * 1024;
exports.VEC_T_MAX_LEN = 1 * 1024 * 1024;
exports.ADDRESS_BYTES_LEN = 36;
exports.ADDRESS_BYTES_PREFIX = "1e";
exports.EMIT_ADDR_BS_H0 = "EM_ADDR_BS_H0";
exports.EMIT_ADDR_BS_H1 = "EM_ADDR_BS_H1";
exports.ED_BASE = ed.RistrettoPoint.fromHex("e2f2ae0a6abc4e71a884a961c500515f58e30b6aa582dd8db6a65945e08d2d76");
// export const ED_BASE = ed.fromAffine().ExtendedPoint.fromRistrettoBytes(
//   Buffer.from(
//     "e2f2ae0a6abc4e71a884a961c500515f58e30b6aa582dd8db6a65945e08d2d76",
//     "hex"
//   )
// );
//# sourceMappingURL=constants.js.map