import Pet = require("./models/Pet");
import User = require("./models/User");

let saveData = async function(data: any) {
  try {
    const user = new User(data.user);
    await user.save();
    const promises = data.pets.map((pet: any) => {
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
  } catch (err) {
    console.log("error", err);
    throw err;
  }
}

export = saveData;
