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
const request = require("request-promise");
const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};
let app = express();
app.use(allowCrossDomain);
let pc = {};
const pcUrl = "https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json";
request(pcUrl)
    .then((res) => __awaiter(this, void 0, void 0, function* () {
    pc = yield JSON.parse(res);
}))
    .catch(err => {
    console.log("Что-то пошло не так", err);
});
app.get("/volumes", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let disk = {};
    let hdd = pc["hdd"];
    for (let key of hdd) {
        if (!(key['volume'] in disk))
            disk[key['volume']] = '0B';
        disk[key['volume']] = disk[key['volume']].replace(/^\d*/, +disk[key['volume']].slice(0, -1) + key['size']);
    }
    res.send(disk);
}));
app.get("/*", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let url = req.url;
    url = url.replace(/^\/|\/$/g, '');
    let path = url.split('/');
    if (url == '')
        path = [];
    let answer = pc;
    path.forEach((key, index) => {
        if ((key == 'length' && index == 0) || (key != 'length' && key in answer)) {
            answer = answer[key];
        }
        else {
            res.status(404).send("Not Found");
        }
    });
    res.json(answer);
}));
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
//# sourceMappingURL=index.js.map