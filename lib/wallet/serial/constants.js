"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ED_BASE = exports.EMIT_ADDR_BS_H1 = exports.EMIT_ADDR_BS_H0 = exports.ADDRESS_BYTES_PREFIX = exports.ADDRESS_BYTES_LEN = exports.VEC_T_MAX_LEN = exports.BYTES_MAX_LEN = void 0;
const ed = __importStar(require("@noble/ed25519"));
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