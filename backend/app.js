"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const logger = require("morgan");
const path = require("path");
const createError = require("http-errors");
const userRoute = require("./routes/users");
const contactRoute = require("./routes/contacts");

const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

exports.app = express();
// exports.app.use(cors(corsOptions)) // Use this after the variable declaration
exports.app.use(cors({
	exposedHeaders: "Location"
}));

exports.app.use(logger("dev"));
exports.app.use(express.json());
exports.app.use(express.static(path.join(__dirname, "src")));
exports.app.use("/users", userRoute.router);
exports.app.use("/contacts", contactRoute.router);
exports.app.use((req, res, next) => {
    next(createError(404));
});
