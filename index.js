"use strict";
var express = require("express");
var app = express();
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};
app.use(allowCrossDomain);
app.get("/task2A", function (req, res) {
    var a = parseFloat(req.query.a);
    var b = parseFloat(req.query.b);
    a = isNaN(a) ? 0 : a;
    b = isNaN(b) ? 0 : b;
    var sum = a + b;
    res.send(sum.toString());
});
app.get("/", function (req, res) {
    res.send("123234");
});
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
//# sourceMappingURL=index.js.map