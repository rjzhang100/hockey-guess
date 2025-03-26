"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CERT = exports.FRONTEND_ORIGIN = exports.NHL_LOGOS_API = exports.NHL_API = exports.JWT_SECRET = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 8080;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.NHL_API = process.env.NHL_API;
exports.NHL_LOGOS_API = process.env.NHL_LOGOS_API;
exports.FRONTEND_ORIGIN = (process.env.FRONTEND_ORIGIN ??
    "http:localhost:5173");
exports.CERT = process.env.CERT;
