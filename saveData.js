"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Pet = require("./models/Pet");
const User = require("./models/User");
const _ = require("lodash");
let saveData = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        let savedData = {};
        const userPromises = data.users.map((user) => {
            const userData = Object.assign({}, user);
            return (new User(userData)).save();
        });
        Promise.all(userPromises)
            .then((users) => {
            savedData.users = users;
            const petPromises = data.pets.map((pet) => {
                let userId = _.find(savedData.users, (user) => {
                    return user.id == pet.userId;
                })._id;
                const petData = Object.assign({}, pet, { user: userId });
                return (new Pet(petData)).save();
            });
            return Promise.all(petPromises);
        })
            .then((pets) => {
            savedData.pets = pets;
        })
            .catch((err) => {
            console.log(err);
        });
        return savedData;
    });
};
module.exports = saveData;
//# sourceMappingURL=saveData.js.map