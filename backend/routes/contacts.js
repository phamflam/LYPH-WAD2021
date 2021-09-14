"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const data = require("../data");
const util_1 = require("../util");
exports.router = express.Router();
exports.router.get("/", (req, res, next) => {
    data.getAllContacts()
        .then(contacts => {
        res.status(200).send(contacts);
    }).catch(err => {
        res.status(500).send(err);
    });
});
exports.router.post('/', (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.street || !req.body.street_extra || !req.body.zip || !req.body.city) {
        res.status(400).send("missing required input!");
        return;
    }
    const rawContact = new util_1.AddressData(req.body.firstName, req.body.lastName, req.body.street, req.body.street_extra, req.body.zip, req.body.city, req.body.state, req.body.country, req.body.global);
    if (req.body.pos) {
        rawContact.setLatLng(req.body.pos);
    }
    if (req.body.owner) {
        rawContact.setOwner(req.body.owner);
    }
    data.addNewContact(rawContact)
        .then(contact => {
        res.status(201).header("Location", "/contacts/" + contact.id).send();
    }).catch(err => {
        res.status(500).send(err);
    });
});
exports.router.put('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (!req.body.firstName || !req.body.lastName || !req.body.street || !req.body.street_extra || !req.body.zip || !req.body.city) {
        res.status(400).send("missing required input!");
        return;
    }
    const rawContact = new util_1.AddressData(req.body.firstName, req.body.lastName, req.body.street, req.body.street_extra, req.body.zip, req.body.city, req.body.state, req.body.country, req.body.global);
    rawContact.setId(id);
    if (req.body.pos) {
        rawContact.setLatLng(req.body.pos);
    }
    if (req.body.owner) {
        rawContact.setOwner(req.body.owner);
    }
    data.updateContact(id, rawContact)
        .then(contact => {
        res.status(204).send();
    })
        .catch(err => {
        if (err.message && err.message.startsWith("No such contact found")) {
            res.status(404).send("No such contact found");
            return;
        }
        res.status(500).send(err);
    });
});
exports.router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    data.getContact(id)
        .then(contact => {
        res.status(200).send(contact);
    }).catch(err => {
        if (err.message && err.message.startsWith("No such contact found")) {
            res.status(404).send("No such contact found");
            return;
        }
        res.status(500).send(err);
    });
});
exports.router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    data.deleteContact(id)
        .then(contact => {
        res.status(204).send();
    }).catch(err => {
        if (err.message && err.message.startsWith("No such contact found")) {
            res.status(404).send("No such contact found");
            return;
        }
        res.status(500).send(err);
    });
});
