// import express from 'express';
// import logger  from 'morgan';
// import path from 'path';
// import createError from 'http-errors';

// const app = express();

// app.use(express.json());
// app.use(logger("dev"));


// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.app = void 0;
// const express = require("express");
// const logger = require("morgan");
// const path = require("path");
// const createError = require("http-errors");
// const userRoute = require("./routes/users");
// const contactRoute = require("./routes/contacts");
// exports.app = express();
// exports.app.use(logger("dev"));
// exports.app.use(express.json());
// exports.app.use(express.static(path.join(__dirname, "public")));
// exports.app.use("/users", userRoute.router);
// exports.app.use("/contacts", contactRoute.router);
// exports.app.use((req, res, next) => {
//     next(createError(404));
// });

// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
export const app = void 0;
import express, { json, static } from "express";
import logger from "morgan";
import { join } from "path";
import createError from "http-errors";
import { router } from "./routes/users";
import { router as _router } from "./routes/contacts";
export const app = express();
app.use(logger("dev"));
app.use(json());
app.use(static(join(__dirname, "public")));
app.use("/users", router);
app.use("/contacts", _router);
app.use((req, res, next) => {
    next(createError(404));
});