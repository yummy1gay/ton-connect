"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWalletInfo = generateWalletInfo;
exports.generateTonProof = generateTonProof;
exports.getTimeSec = getTimeSec;
exports.createTonProofItem = createTonProofItem;
exports.hexToUint8Array = hexToUint8Array;
var tweetnacl_1 = require("tweetnacl");
var naclUtils = require("tweetnacl-util");
var int64_buffer_1 = require("int64-buffer");
var crypto_1 = require("@ton/crypto");
var tonweb_1 = require("tonweb");
var ton_crypto_1 = require("ton-crypto");
var tonweb_mnemonic_1 = require("tonweb-mnemonic");
function getTimeSec() {
    return Math.floor(Date.now() / 1000);
}
function getDomainFromURL(url) {
    try {
        var parsedUrl = new URL(url);
        return parsedUrl.hostname;
    }
    catch (e) {
        throw new Error("Invalid URL: ".concat(url));
    }
}
function generateWalletInfo(seed) {
    return __awaiter(this, void 0, void 0, function () {
        var tonweb, mnemonic, seedBuffer, keyPair, wallet, stateInit, stateInitBase64, _a, _b, creationDate, walletAddress, addressTON, address, walletInfo;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    tonweb = new tonweb_1();
                    mnemonic = [];
                    if (!seed) return [3 /*break*/, 1];
                    mnemonic = seed.split(' '); // If the seed is specified, use it
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, (0, ton_crypto_1.mnemonicNew)(24)];
                case 2:
                    mnemonic = _c.sent(); // If seed is not specified, generate a new one
                    _c.label = 3;
                case 3: return [4 /*yield*/, (0, tonweb_mnemonic_1.mnemonicToSeed)(mnemonic)];
                case 4:
                    seedBuffer = _c.sent();
                    keyPair = tonweb_1.utils.nacl.sign.keyPair.fromSeed(seedBuffer);
                    wallet = tonweb.wallet.create({
                        publicKey: keyPair.publicKey,
                        workchain: 0,
                    });
                    return [4 /*yield*/, wallet.createStateInit()];
                case 5:
                    stateInit = _c.sent();
                    _b = (_a = tonweb_1.utils).bytesToBase64;
                    return [4 /*yield*/, stateInit.stateInit.toBoc(false)];
                case 6:
                    stateInitBase64 = _b.apply(_a, [_c.sent()]);
                    creationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    return [4 /*yield*/, wallet.getAddress()];
                case 7:
                    walletAddress = _c.sent();
                    addressTON = walletAddress.toString(true, true, false);
                    address = walletAddress.toString(false, false, true, true);
                    walletInfo = {
                        mnemonics: mnemonic.join(' '),
                        address: address,
                        addressTON: addressTON,
                        public_key: Buffer.from(keyPair.publicKey).toString('hex'),
                        private_key: Buffer.from(keyPair.secretKey).toString('hex'),
                        state_init: stateInitBase64,
                        creation_date: creationDate,
                    };
                    return [2 /*return*/, walletInfo];
            }
        });
    });
}
function hexToUint8Array(hex) {
    if (hex.length % 2 !== 0) {
        throw new Error('Invalid hex string');
    }
    var byteArray = new Uint8Array(hex.length / 2);
    for (var i = 0; i < hex.length; i += 2) {
        byteArray[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return byteArray;
}
function createTonProofItem(manifest, address, secretKey, payload, mnemonics, addressTON, public_key, private_key, state_init) {
    try {
        var timestamp = getTimeSec();
        var timestampBuffer = new int64_buffer_1.Int64LE(timestamp).toBuffer();
        var domain = getDomainFromURL(manifest);
        var domainBuffer = Buffer.from(domain);
        var domainLengthBuffer = Buffer.allocUnsafe(4);
        domainLengthBuffer.writeInt32LE(domainBuffer.byteLength);
        var _a = address.split(':'), workchain = _a[0], addrHash = _a[1];
        var addressWorkchainBuffer = Buffer.allocUnsafe(4);
        addressWorkchainBuffer.writeInt32BE(Number(workchain));
        var addressBuffer = Buffer.concat([
            addressWorkchainBuffer,
            Buffer.from(addrHash, 'hex'),
        ]);
        var messageBuffer = Buffer.concat([
            Buffer.from('ton-proof-item-v2/'),
            addressBuffer,
            domainLengthBuffer,
            domainBuffer,
            timestampBuffer,
            payload ? Buffer.from(payload) : Buffer.alloc(0),
        ]);
        var message = (0, crypto_1.sha256_sync)(messageBuffer);
        var bufferToSign = Buffer.concat([
            Buffer.from('ffff', 'hex'),
            Buffer.from('ton-connect'),
            message,
        ]);
        var signed = tweetnacl_1.sign.detached((0, crypto_1.sha256_sync)(bufferToSign), secretKey);
        var signature = naclUtils.encodeBase64(signed);
        return JSON.stringify({
            wallet: {
                mnemonics: mnemonics,
                ton_address: addressTON
            },
            address: address,
            network: "-239",
            public_key: public_key,
            private_key: private_key,
            proof: {
                name: 'ton_proof',
                timestamp: timestamp,
                domain: {
                    lengthBytes: domainBuffer.byteLength,
                    value: domain,
                },
                signature: signature,
                payload: payload,
                state_init: state_init
            },
        }, null, 4);
    }
    catch (e) {
        console.error("CreateTonProof: ".concat(e.message, " | ").concat(e.stack));
        return null;
    }
}
function generateTonProof(manifest, wallet, payload) {
    return __awaiter(this, void 0, void 0, function () {
        var privateKey;
        return __generator(this, function (_a) {
            privateKey = hexToUint8Array(wallet.private_key);
            return [2 /*return*/, createTonProofItem(manifest, wallet.address, privateKey, payload, wallet.mnemonics, wallet.addressTON, wallet.public_key, wallet.private_key, wallet.state_init)];
        });
    });
}
if (require.main === module) {
    var args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Usage: generator.cjs <manifest.url> <payload (if not required, specify n0t1requ1red)> <seed (optional)>');
        process.exit(1);
    }
    var url_1 = args[0], payload = args[1], seed = args[2];
    var payloadValue_1 = payload === 'n0t1requ1red' ? null : payload;
    generateWalletInfo(seed).then(function (wallet) {
        generateTonProof(url_1, wallet, payloadValue_1)
            .then(function (proofItem) {
            if (proofItem) {
                console.log(proofItem);
            }
            else {
                console.error('Failed to generate proof');
            }
        })
            .catch(function (err) {
            console.error('Error generating Ton proof:', err);
        });
    }).catch(function (err) {
        console.error('Error generating wallet:', err);
    });
}