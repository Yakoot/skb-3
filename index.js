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
const bodyParser = require("body-parser");
const _ = require("lodash");
let pokemons = require("./pokemons.json");
pokemons = _.sortBy(pokemons, "name");
let all = {
    "angular": _.orderBy(pokemons, [(one) => {
            return one.weight / one.height;
        }, "name"], ["asc", "asc"]),
    "fat": _.orderBy(pokemons, [(one) => {
            return one.weight / one.height;
        }, "name"], ["desc", "asc"]),
    "huge": _.orderBy(pokemons, ["height", "name"], ["desc", "asc"]),
    "micro": _.orderBy(pokemons, ["height", "name"], ["asc", "asc"]),
    "heavy": _.orderBy(pokemons, ["weight", "name"], ["desc", "asc"]),
    "light": _.orderBy(pokemons, ["weight", "name"], ["asc", "asc"])
};
const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};
let app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());
let makeOffset = (array, offset, limit) => {
    let answer = _.map(array, (one) => { return one.name; });
    return answer.slice(offset, offset + limit);
};
app.get("/:type?", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let offset = req.query.offset ? +req.query.offset : 0;
    let limit = req.query.limit ? +req.query.limit : 20;
    let type = "";
    if (req.params && req.params.type) {
        type = req.params.type;
    }
    let array = req.params.type ? all[req.params.type] : pokemons;
    res.json(makeOffset(array, offset, limit));
}));
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
//# sourceMappingURL=index.js.map