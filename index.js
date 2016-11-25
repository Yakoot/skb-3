"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");
const Pet = require("./models/Pet");
const User = require("./models/User");
const rp = require("request-promise");
const isAdmin = require("./middlewares/isAdmin");
mongoose.connect('mongodb://localhost/3b');
mongoose.Promise = Promise;
const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};
let app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());
const url = "https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json";
let data = {};
rp({
    uri: url,
    json: true
})
    .then((resp) => {
    data = resp;
});
app.get("/clear", isAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield User.remove({});
    yield Pet.remove({});
    return res.send("OK");
}));
app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(data);
}));
app.get("/users(/:search)?(/pets)?(/populate)?", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let answer = _.cloneDeep(data.users);
    const users = _.cloneDeep(data.users);
    const pets = _.cloneDeep(data.pets);
    let search = req.params.search;
    if (search && search != 'populate') {
        let type = /\d+/.test(search) ? 'id' : 'username';
        let user = _.find(answer, (user) => {
            return user[type] == search;
        });
        if (user == null) {
            res.status(404).send("Not Found");
        }
        else {
            answer = user;
            if (_.includes(req.params, '/pets')) {
                answer = _.filter(pets, (pet) => {
                    return pet.userId = user.id;
                });
            }
        }
    }
    if (req.query.havePet) {
        let havePet = _.filter(users, (user) => {
            return _.some(pets, (pet) => {
                return pet.userId == user.id && pet.type == req.query.havePet;
            });
        });
        if (havePet == null) {
            res.status(404).send("Not Found");
        }
        else {
            answer = havePet;
        }
    }
    if (_.includes(req.params, '/populate')) {
        if (!answer.length) {
            answer.pets = _.filter(pets, (pet) => {
                return answer.id == pet.userId;
            });
        }
        else {
            let newAnswer = _.map(answer, (user) => {
                let newUser = user;
                newUser.pets = _.filter(pets, (pet) => {
                    return user.id == pet.userId;
                });
                return newUser;
            });
            answer = newAnswer;
        }
    }
    res.send(JSON.stringify(answer));
}));
app.get("/pets(/:id([-\\d]+))?(/populate)?", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let answer = _.cloneDeep(data.pets);
    const users = _.cloneDeep(data.users);
    const pets = _.cloneDeep(data.pets);
    let id = req.params.id;
    if (id) {
        let pet = _.find(answer, (pet) => {
            return pet.id == id;
        });
        if (pet == null) {
            res.status(404).send("Not Found");
        }
        else {
            answer = pet;
        }
    }
    if (req.query.type) {
        let type = _.filter(pets, (pet) => {
            return pet.type == req.query.type;
        });
        if (type == null) {
            res.status(404).send("Not Found");
        }
        else {
            answer = type;
        }
    }
    if (req.query.age_gt) {
        let age_gt = _.filter(answer, (pet) => {
            return pet.age > req.query.age_gt;
        });
        if (age_gt == null) {
            res.status(404).send("Not Found");
        }
        else {
            answer = age_gt;
        }
    }
    if (req.query.age_lt) {
        let age_lt = _.filter(answer, (pet) => {
            return pet.age < req.query.age_lt;
        });
        if (age_lt == null) {
            res.status(404).send("Not Found");
        }
        else {
            answer = age_lt;
        }
    }
    if (_.includes(req.params, '/populate')) {
        if (!answer.length) {
            let petUser = _.find(users, (user) => {
                return user.id == answer.userId;
            });
            answer.user = petUser;
        }
        else {
            answer = _.map(answer, (pet) => {
                let newPet = pet;
                newPet.user = _.find(users, (user) => {
                    return user.id == pet.userId;
                });
                return newPet;
            });
        }
    }
    res.send(JSON.stringify(answer));
}));
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
//# sourceMappingURL=index.js.map