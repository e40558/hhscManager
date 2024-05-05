"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBytes = void 0;
var util = require('util');
var crypto = require('crypto');
exports.randomBytes = util.promisify(crypto.randomBytes);
//const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
//const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');
var SESSION_DURATION = 240;
