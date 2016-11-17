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
const saveData = require("./saveData");
const Pet = require("./models/Pet");
const User = require("./models/User");
const isAdmin = require("./middlewares/isAdmin");
mongoose.connect('mongodb://localhost/test');
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
app.get("/clear", isAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield User.remove({});
    yield Pet.remove({});
    return res.send("OK");
}));
app.post("/data", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const data = req.body;
    if (!data.user)
        return res.status(400).send("user required");
    if (!data.pets)
        data.pets = [];
    const user = yield User.findOne({
        name: data.user.name
    });
    if (user)
        return res.status(400).send("user.name is exists");
    try {
        const result = yield saveData(data);
        return res.json(result);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
app.get("/users", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const users = yield User.find();
    res.json(users);
}));
app.get("/pets", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const pets = yield Pet.find().populate("owner");
    res.json(pets);
}));
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
//# sourceMappingURL=index.js.map