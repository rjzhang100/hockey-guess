"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdRegex = exports.CONSTS = void 0;
var CONSTS;
(function (CONSTS) {
    CONSTS["TOKEN_COOKIE_KEY"] = "token";
})(CONSTS || (exports.CONSTS = CONSTS = {}));
exports.ObjectIdRegex = /^[a-fA-F0-9]{24}$/;
