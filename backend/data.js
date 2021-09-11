import {Mongoclient} from "mongodb";
import { AddressData, User } from "./util.js";
const database_uri = "mongodb://localhost:27017";
const client = new Mongoclient(database_uri, {
    useUnifiedTopology: true
});

export async function getAllContacts(){
    return new Promise(async (resolve, reject) => {
        let cArray //= Array[AddressData];
 await client.connect();
 let contactsCollection = client.db("advizDB").collection("contacts");
 cArray = await contactsCollection.find({}).toArray();

 if(!cArray) {
     reject();
     return;
 }
 resolve(cArray);
    })
}

export async function getContact(id){
    return new Promise(async(resolve, reject)=> {
        let contact//= AddressData
        await client.connect();
        let contactsCollection = client.db("advizDB").collection("contacts");
        contact = (await contactsCollection.find({id}).toArray())[0];
        if (!contact) {
            reject(new Error("no such con found"));
            return;
        }
        resolve(contact);
    })
}


export async function addNewContact(data) {
	return new Promise(async (resolve, reject) => {
		let id = await getNextId("contacts");
		data.setId(id);

		await client.connect();
		let contactsCollection = client.db("advizDB").collection("contacts");
		await contactsCollection.insertOne(data);

		resolve(data);
	});
}

export async function deleteContact(id){
	return new Promise(async (resolve, reject) => {
		let contact;
		await client.connect();
		let contactsCollection = client.db("advizDB").collection("contacts");
		contact = (await contactsCollection.find({ id }).toArray())[0];
		
		if (!contact) {
			reject(new Error("No such contact found"));
			return;
		}

		await contactsCollection.deleteOne({ id });
		resolve(contact);
	});
}

export async function updateContact(id, data){
	return new Promise(async (resolve, reject) => {
		let contact;
		await client.connect();
		let contactsCollection = client.db("advizDB").collection("contacts");
		contact = (await contactsCollection.find({ id }).toArray())[0];

		if (!contact) {
			reject(new Error("No such contact found"));
			return;
		}

		await contactsCollection.replaceOne({ id }, data);
		resolve(data);
	});
}

export async function getAllUsers(){
	return new Promise(async (resolve, reject) => {
		let uArray;

		await client.connect();
		let usersCollection = client.db("advizDB").collection("users");
		uArray = await usersCollection.find({}).toArray();

		if (!uArray) {
			reject();
			return;
		}

		resolve(uArray.map(u => User.fromDB(u)));
	});
}

export async function getUser(id) {
	return new Promise(async (resolve, reject) => {
		let user;

		await client.connect();
		let usersCollection = client.db("advizDB").collection("users");
		user = (await usersCollection.find({ id: id }).toArray())[0];

		if (!user) {
			reject(new Error("No such user found"));
			return;
		}

		resolve(User.fromDB(user));
	});
}

async function getNextId(collection) {
	await client.connect();
	let ids = client.db("advizDB").collection("ids");
	let doc = (await ids.find({collection: collection}).toArray())[0];
	//console.log(doc);
	doc.id++;
	//console.log(doc);
	let nextId = doc.id;
	await ids.replaceOne({collection: collection}, doc);
	return nextId;
}

// client.connect(
//     console.log("connected!!!")
// )

// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const _getUser = exports.getAllUsers = exports.updateContact = exports.deleteContact = exports.addNewContact = exports.getContact = exports.getAllContacts = void 0;
// export { _getUser as getUser };
// import { User } from "./util";
// import { MongoClient } from "mongodb";
// const database_uri = "mongodb://localhost:27017";
// const client = new MongoClient(database_uri, {
//     useUnifiedTopology: true
// });

// function getAllContacts() {
//     return __awaiter(this, void 0, void 0, function* () {
//         return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
//             let cArray;
//             yield client.connect();
//             let contactsCollection = client.db("advizDB").collection("contacts");
//             cArray = yield contactsCollection.find({}).toArray();
//             if (!cArray) {
//                 reject();
//                 return;
//             }
//             resolve(cArray);
//         }));
//     });
// }
// const _getAllContacts = getAllContacts;
// export { _getAllContacts as getAllContacts };
// function getContact(id) {
//     return __awaiter(this, void 0, void 0, function* () {
//         return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
//             let contact;
//             yield client.connect();
//             let contactsCollection = client.db("advizDB").collection("contacts");
//             contact = (yield contactsCollection.find({ id: id }).toArray())[0];
//             if (!contact) {
//                 reject(new Error("No such contact found"));
//                 return;
//             }
//             resolve(contact);
//         }));
//     });
// }
// const _getContact = getContact;
// export { _getContact as getContact };
// function addNewContact(data) {
//     return __awaiter(this, void 0, void 0, function* () {
//         return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
//             let id = yield getNextId("contacts");
//             data.setId(id);
//             yield client.connect();
//             let contactsCollection = client.db("advizDB").collection("contacts");
//             yield contactsCollection.insertOne(data);
//             resolve(data);
//         }));
//     });
// }
// const _addNewContact = addNewContact;
// export { _addNewContact as addNewContact };
// function deleteContact(id) {
//     return __awaiter(this, void 0, void 0, function* () {
//         return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
//             let contact;
//             yield client.connect();
//             let contactsCollection = client.db("advizDB").collection("contacts");
//             contact = (yield contactsCollection.find({ id: id }).toArray())[0];
//             if (!contact) {
//                 reject(new Error("No such contact found"));
//                 return;
//             }
//             yield contactsCollection.deleteOne({ id: id });
//             resolve(contact);
//         }));
//     });
// }
// const _deleteContact = deleteContact;
// export { _deleteContact as deleteContact };
// function updateContact(id, data) {
//     return __awaiter(this, void 0, void 0, function* () {
//         return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
//             let contact;
//             yield client.connect();
//             let contactsCollection = client.db("advizDB").collection("contacts");
//             contact = (yield contactsCollection.find({ id: id }).toArray())[0];
//             if (!contact) {
//                 reject(new Error("No such contact found"));
//                 return;
//             }
//             yield contactsCollection.replaceOne({ id: id }, data);
//             resolve(data);
//         }));
//     });
// }
// const _updateContact = updateContact;
// export { _updateContact as updateContact };
// function getAllUsers() {
//     return __awaiter(this, void 0, void 0, function* () {
//         return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
//             let uArray;
//             yield client.connect();
//             let usersCollection = client.db("advizDB").collection("users");
//             uArray = yield usersCollection.find({}).toArray();
//             if (!uArray) {
//                 reject();
//                 return;
//             }
//             resolve(uArray.map(u => User.fromDB(u)));
//         }));
//     });
// }
// const _getAllUsers = getAllUsers;
// export { _getAllUsers as getAllUsers };
// function getUser(id) {
//     return __awaiter(this, void 0, void 0, function* () {
//         return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
//             let user;
//             yield client.connect();
//             let usersCollection = client.db("advizDB").collection("users");
//             user = (yield usersCollection.find({ id: id }).toArray())[0];
//             if (!user) {
//                 reject(new Error("No such user found"));
//                 return;
//             }
//             resolve(User.fromDB(user));
//         }));
//     });
// }
// const _getUser = getUser;
// export { _getUser as getUser };
// function getNextId(collection) {
//     return __awaiter(this, void 0, void 0, function* () {
//         yield client.connect();
//         let ids = client.db("advizDB").collection("ids");
//         let doc = (yield ids.find({ collection: collection }).toArray())[0];
//         doc.id++;
//         let nextId = doc.id;
//         yield ids.replaceOne({ collection: collection }, doc);
//         return nextId;
//     });
// }
