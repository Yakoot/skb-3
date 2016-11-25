import express = require("express");
import mongoose = require("mongoose");
import bodyParser = require("body-parser");

import _ = require("lodash");
// import * as prm from 'bluebird';
import saveData = require("./saveData");
import Pet = require("./models/Pet");
import User = require("./models/User");
import rp = require("request-promise");

import isAdmin = require("./middlewares/isAdmin");


import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;

mongoose.connect('mongodb://localhost/3b');
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

const url = "https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json";
let data:any = {};

rp({
  uri: url,
  json: true
})
.then((resp: any) => {
  data = resp;
  // saveData(resp);
});



app.get("/clear", isAdmin, async (req: Request, res: Response) => {
  await User.remove({});
  await Pet.remove({});
  return res.send("OK");
});

app.get("/", async (req:Request, res:Response) => {
  res.json(data);
});
app.get("/users(/:search)?(/pets)?(/populate)?", async (req:Request, res:Response) => {
  let answer = _.cloneDeep(data.users);
  const users = _.cloneDeep(data.users);
  const pets = _.cloneDeep(data.pets);
  let search = req.params.search;
  if (search && search != 'populate') {
    let type = /\d+/.test(search) ? 'id' : 'username';
    let user = _.find(answer, (user:any) => {
      return user[type] == search;
    });
    if (user == null) {
      res.status(404).send("Not Found");
    } else {
      answer = user;
      if (_.includes(req.params, '/pets')) {
        answer = _.filter(pets, (pet:any) => {
          return pet.userId = user.id;
        });
      }
    }
  }
  if (req.query.havePet) {
    let havePet = _.filter(users, (user:any) => {
      return _.some(pets, (pet:any) => {
        return pet.userId == user.id && pet.type == req.query.havePet;
      });
    });
    if (havePet == null) {
      res.status(404).send("Not Found");
    } else {
      answer = havePet;
    }
  }
  if (_.includes(req.params, '/populate')) {
    if(!answer.length) {
      answer.pets = _.filter(pets, (pet:any) => {
        return answer.id == pet.userId;
      });
    } else {
      let newAnswer = _.map(answer, (user:any) => {
        let newUser = user;
        newUser.pets = _.filter(pets, (pet:any) => {
          return user.id == pet.userId;
        });
        return newUser;
      });
      answer = newAnswer;
    }
  }
  res.send(JSON.stringify(answer));
});

app.get("/pets(/:id([-\\d]+))?(/populate)?", async (req:Request, res:Response) => {
  let answer = _.cloneDeep(data.pets);
  const users = _.cloneDeep(data.users);
  const pets = _.cloneDeep(data.pets);
  let id = req.params.id;
  if (id) {
    let pet = _.find(answer, (pet:any) => {
      return pet.id == id;
    });
    if (pet == null) {
      res.status(404).send("Not Found");
    } else {
      answer = pet;
    }
  }
  if (req.query.type) {
    let type = _.filter(pets, (pet:any) => {
      return pet.type == req.query.type;
    });
    if (type == null) {
      res.status(404).send("Not Found");
    } else {
      answer = type;
    }
  }
  if (req.query.age_gt) {
    let age_gt = _.filter(answer, (pet:any) => {
      return pet.age > req.query.age_gt;
    });
    if (age_gt == null) {
      res.status(404).send("Not Found");
    } else {
      answer = age_gt;
    }
  }
  if (req.query.age_lt) {
    let age_lt = _.filter(answer, (pet:any) => {
      return pet.age < req.query.age_lt;
    });
    if (age_lt == null) {
      res.status(404).send("Not Found");
    } else {
      answer = age_lt;
    }
  }
  if (_.includes(req.params, '/populate')) {
    if(!answer.length) {
      let petUser = _.find(users, (user:any) => {
        return user.id == answer.userId;
      });
      answer.user = petUser;
    } else {
      answer = _.map(answer, (pet:any) => {
        let newPet = pet;
        newPet.user = _.find(users, (user:any) => {
          return user.id == pet.userId;
        });
        return newPet;
      });
    }
  }
  res.send(JSON.stringify(answer));
});

app.listen(3000, function () {
    // tslint:disable-next-line
    console.log("Example app listening on port 3000!");
});
