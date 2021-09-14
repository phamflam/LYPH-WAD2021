"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const data = require("../data");
exports.router = express.Router();
exports.router.get("/", (req, res, next) => {
    data.getAllUsers()
        .then(users => {
        res.status(200).send(users.map(u => u.clearPassword()));
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});
exports.router.get("/:id", (req, res, next) => {
    let id = parseInt(req.params.id);
    data.getUser(id)
        .then(user => {
        res.status(200).send(user.clearPassword());
    }).catch(err => {
        if (err.message && err.message.startsWith("No such user found")) {
            res.status(404).send("No such user found");
            return;
        }
        console.error(err);
        res.status(500).send(err);
    });
});
exports.router.post("/", (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password || username.length == 0 || password.length == 0) {
        res.status(400).send("name + password is required");
        return;
    }
    data.getAllUsers()
        .then(users => {
        let user = users.find(u => u.matches(username, password));
        if (!user) {
            res.status(401).send();
            return;
        }
        res.status(200).send(user.clearPassword());
    }).catch(err => {
        res.status(500).send(err);
    });
});
