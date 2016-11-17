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
let saveData = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = new User(data.user);
            yield user.save();
            const promises = data.pets.map((pet) => {
                const petData = Object.assign({}, pet, {
                    owner: user._id,
                });
                return (new Pet(petData)).save();
            });
            console.log("success");
            return {
                user,
                pets: Promise.all(promises),
            };
        }
        catch (err) {
            console.log("error", err);
            throw err;
        }
    });
};
module.exports = saveData;
//# sourceMappingURL=saveData.js.map