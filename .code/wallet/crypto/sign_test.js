import { ecsign, ecrecover } from './sign';
var key = "7b67dcc6de11e6a360bfa8a8856b8c8576529ee54c12bb715b207cd63c15b207";
var m = "8b423c520e6083c67ed81737e9d42a5f5b74362b3e291692b4d354e7e2a0c310";
var sig = ecsign(m, Buffer.from(key, 'hex'));
console.log(sig);
var recover = ecrecover(sig, m);
console.log(recover);
//# sourceMappingURL=sign_test.js.map