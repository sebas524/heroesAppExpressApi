const mongoose = require("mongoose");
require("dotenv").config();

//
// ! CONNECTING MONGOOSE WITH DB
//
// * async in case it takes longer than expected the connection to the db.
const connection = async () => {
  try {
    // * connection:

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connection to DB has been established!");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to DB.");
  }
};

module.exports = {
  connection,
};
