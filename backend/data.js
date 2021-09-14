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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getAllUsers = exports.updateContact = exports.deleteContact = exports.addNewContact = exports.getContact = exports.getAllContacts = void 0;
const util_1 = require("./util");
const mongodb_1 = require("mongodb");
const database_uri = "mongodb://localhost:27017";
const client = new mongodb_1.MongoClient(database_uri, {
    useUnifiedTopology: true
});
function getAllContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let cArray;
            yield client.connect();
            let contactsCollection = client.db("advizDB").collection("contacts");
            cArray = yield contactsCollection.find({}).toArray();
            if (!cArray) {
                reject();
                return;
            }
            resolve(cArray);
        }));
    });
}
exports.getAllContacts = getAllContacts;
function getContact(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let contact;
            yield client.connect();
            let contactsCollection = client.db("advizDB").collection("contacts");
            contact = (yield contactsCollection.find({ id: id }).toArray())[0];
            if (!contact) {
                reject(new Error("No such contact found"));
                return;
            }
            resolve(contact);
        }));
    });
}
exports.getContact = getContact;
function addNewContact(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let id = yield getNextId("contacts");
            data.setId(id);
            yield client.connect();
            let contactsCollection = client.db("advizDB").collection("contacts");
            yield contactsCollection.insertOne(data);
            resolve(data);
        }));
    });
}
exports.addNewContact = addNewContact;
function deleteContact(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let contact;
            yield client.connect();
            let contactsCollection = client.db("advizDB").collection("contacts");
            contact = (yield contactsCollection.find({ id: id }).toArray())[0];
            if (!contact) {
                reject(new Error("No such contact found"));
                return;
            }
            yield contactsCollection.deleteOne({ id: id });
            resolve(contact);
        }));
    });
}
exports.deleteContact = deleteContact;
function updateContact(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let contact;
            yield client.connect();
            let contactsCollection = client.db("advizDB").collection("contacts");
            contact = (yield contactsCollection.find({ id: id }).toArray())[0];
            if (!contact) {
                reject(new Error("No such contact found"));
                return;
            }
            yield contactsCollection.replaceOne({ id: id }, data);
            resolve(data);
        }));
    });
}
exports.updateContact = updateContact;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let uArray;
            yield client.connect();
            let usersCollection = client.db("advizDB").collection("users");
            uArray = yield usersCollection.find({}).toArray();
            if (!uArray) {
                reject();
                return;
            }
            resolve(uArray.map(u => util_1.User.fromDB(u)));
        }));
    });
}
exports.getAllUsers = getAllUsers;
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let user;
            yield client.connect();
            let usersCollection = client.db("advizDB").collection("users");
            user = (yield usersCollection.find({ id: id }).toArray())[0];
            if (!user) {
                reject(new Error("No such user found"));
                return;
            }
            resolve(util_1.User.fromDB(user));
        }));
    });
}
exports.getUser = getUser;
function getNextId(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        let ids = client.db("advizDB").collection("ids");
        let doc = (yield ids.find({ collection: collection }).toArray())[0];
        doc.id++;
        let nextId = doc.id;
        yield ids.replaceOne({ collection: collection }, doc);
        return nextId;
    });
}
