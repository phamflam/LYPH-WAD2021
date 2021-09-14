"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.AddressData = void 0;
class IDHolder {
    setId(id) {
        this.id = id;
        return this;
    }
}
class AddressData extends IDHolder {
    constructor(firstName, lastName, street, street_extra, zip, city, state, country, global = false) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.street_extra = street_extra;
        this.zip = zip;
        this.city = city;
        this.state = state;
        this.country = country;
        this.global = global;
    }
    ;
    setLatLng(pos) {
        this.pos = pos;
        return this;
    }
    setOwner(owner) {
        this.owner = owner;
        return this;
    }
}
exports.AddressData = AddressData;
class User extends IDHolder {
    constructor(name, password, privileged = false) {
        super();
        this.name = name;
        this.password = password;
        this.privileged = privileged;
    }
    ;
    static fromDB(user) {
        return new User(user.name, user.password, user.privileged).setId(user.id);
    }
    matches(name, pass) {
        if (this.name !== name)
            return false;
        if (this.password !== pass)
            return false;
        return true;
    }
    clearPassword() {
        delete this.password;
        return this;
    }
}
exports.User = User;
