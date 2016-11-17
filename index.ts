import express = require("express");
import mongoose = require("mongoose");
import bodyParser = require("body-parser");
// import * as prm from 'bluebird';
import saveData = require("./saveData");
import Pet = require("./models/Pet");
import User = require("./models/User");

import isAdmin = require("./middlewares/isAdmin");


import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = Promise;

// CORS middleware
const allowCrossDomain = function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "http://account.skill-branch.ru");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
};

let app = express();
app.use(allowCrossDomain);
app.use(bodyParser.json());

app.get("/clear", isAdmin, async (req: Request, res: Response) => {
  await User.remove({});
  await Pet.remove({});
  return res.send("OK");
});

app.post("/data", async (req: Request, res: Response) => {
  const data = req.body;
  if(!data.user) return res.status(400).send("user required");
  if(!data.pets) data.pets = [];

  const user = await User.findOne({
    name: data.user.name
  });

  if (user) return res.status(400).send("user.name is exists");

  try {
    const result = await saveData(data);
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});


app.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

app.get("/pets", async (req: Request, res: Response) => {
  const pets = await Pet.find().populate("owner");
  res.json(pets);
});

app.listen(3000, function () {
    // tslint:disable-next-line
    console.log("Example app listening on port 3000!");
});
