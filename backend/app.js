"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const logger = require("morgan");
const path = require("path");
const createError = require("http-errors");
const userRoute = require("./routes/users");
const contactRoute = require("./routes/contacts");
exports.app = express();
exports.app.use(logger("dev"));
exports.app.use(express.json());
exports.app.use(express.static(path.join(__dirname, "src")));
exports.app.use("/users", userRoute.router);
exports.app.use("/contacts", contactRoute.router);
exports.app.use((req, res, next) => {
    next(createError(404));
});
