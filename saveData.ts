import Pet = require("./models/Pet");
import User = require("./models/User");
import _ = require("lodash");


let saveData = async function(data: any) {
  let savedData:any = {};
    const userPromises = data.users.map((user:any) => {
      const userData = Object.assign({}, user);
      return (new User(userData)).save();
    });
    Promise.all(userPromises)
    .then((users) => {
      // console.log("Users have been saved");
      savedData.users = users;
      const petPromises = data.pets.map((pet:any) => {
        // console.log(savedData.users);
        let userId = _.find(savedData.users, (user:any) => {
          return user.id == pet.userId;
        })._id;
        const petData = Object.assign({}, pet, {user: userId});
        return (new Pet(petData)).save();
      });
      return Promise.all(petPromises);
    })
    .then((pets: any) => {
      // console.log("Pets have been saved");
      savedData.pets = pets;
    })
    .catch ((err) => {
      console.log(err);
    });
    return savedData;
}

export = saveData;
