"use strict";
exports.__esModule = true;
var sign_1 = require("./sign");
var key = "7b67dcc6de11e6a360bfa8a8856b8c8576529ee54c12bb715b207cd63c15b207";
var m = "64c2d1dab59dee2c7741acee3826dad50cdb7f6adb28a159b1bc6aa5374a2b24";
var sig = sign_1.ecsign(m, Buffer.from(key, 'hex'));
console.log(sig);
var recover = sign_1.ecrecover(sig, m);
console.log(recover);
