const { Schema, model } = require("mongoose");

const HeroSchema = Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  superhero: { type: String, required: true },
  publisher: String,
  alterEgo: String,
  firstAppearance: String,
  characters: String,
  photo: String,

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Hero", HeroSchema);
