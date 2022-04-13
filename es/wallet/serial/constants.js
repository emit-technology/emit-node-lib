import * as ed from "@noble/ed25519";
// import * as ed from "ed25519";
export const BYTES_MAX_LEN = 4 * 1024 * 1024;
export const VEC_T_MAX_LEN = 1 * 1024 * 1024;
export const ADDRESS_BYTES_LEN = 36;
export const ADDRESS_BYTES_PREFIX = "1e";
export const EMIT_ADDR_BS_H0 = "EM_ADDR_BS_H0";
export const EMIT_ADDR_BS_H1 = "EM_ADDR_BS_H1";
export const ED_BASE = ed.RistrettoPoint.fromHex("e2f2ae0a6abc4e71a884a961c500515f58e30b6aa582dd8db6a65945e08d2d76");
// export const ED_BASE = ed.fromAffine().ExtendedPoint.fromRistrettoBytes(
//   Buffer.from(
//     "e2f2ae0a6abc4e71a884a961c500515f58e30b6aa582dd8db6a65945e08d2d76",
//     "hex"
//   )
// );
//# sourceMappingURL=constants.js.map