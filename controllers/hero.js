const Hero = require("../models/hero");

const heroTest = (req, res) => {
  return res.status(200).json({ hello: "world form hero controller" });
};

// *SAVE HERO
const saveHero = async (req, res) => {
  // * get req.body:
  const heroToSave = req.body;
  // * in case theres nothing return a negative res
  if (!heroToSave) {
    return res.status(400).json({
      status: "Error",
      message: "Hero field has not been provided.",
    });
  }
  // * create and fill object

  let newHero = new Hero(heroToSave);
  newHero.user = req.user.id;
  // * save post to db:
  try {
    const savedHero = await newHero.save();
    return res.status(200).json({
      status: "Success",
      message: "Hero has been correctly saved to DB.",
      loggedInAs: req.user,
      savedPost: savedHero,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      message: "Server error, please contact admin.",
    });
  }
};

// * FETCH PARTICULAR HERO

const getHero = async (req, res) => {
  // * get id param from url:
  const id = req.params.id;
  try {
    // * find id in db:
    const foundHero = await Hero.findById(id);

    if (!foundHero) {
      return res
        .status(404)
        .json({ status: "Error", message: "Hero not found." });
    }

    return res.status(200).json({
      status: "Success",
      foundPost: foundHero,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      message: "Server error, please contact admin.",
    });
  }
};

// * DELETE HERO
const deleteHero = async (req, res) => {
  // * get id from link:
  const heroToDelete = req.params.id;
  // * get id from logged in as:
  const loggedInAs = req.user;

  try {
    const foundHero = await Post.findOneAndRemove({
      user: req.user.id,
      _id: heroToDelete,
    });
    if (!foundHero) {
      return res.status(400).json({
        status: "Error",
        message: "Hero not found.",
      });
    }
    return res.status(200).json({
      status: "Success",
      loggedInAs,
      message: "Hero has been removed.",
      deletedHero: foundHero,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({
      status: "Error",
      message: "Server error, please contact admin.",
    });
  }
};

const getAllUserHeroes = async (req, res) => {
  // * get id from link:
  const userId = req.params.id;
  // * get id from logged in as:
  const loggedInAs = req.user;
  // * page query:
  let page = parseInt(req.query.page) || 1;
  const itemsPerPage = 2;

  try {
    const foundHeroes = await Post.find({
      user: userId,
    })
      .populate("user", "-password -_id -__v -role")
      .sort("-created_at")
      .paginate(page, itemsPerPage);

    const totalHeroes = await Post.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalHeroes / itemsPerPage);

    if (!foundHeroes) {
      return res.status(400).json({
        status: "Error",
        message: "No heroes found.",
      });
    }
    return res.status(200).json({
      status: "Success",
      loggedInAs,
      message: "Hero(s) found.",
      foundHeroes: {
        totalPosts: totalHeroes,
        totalPages,
        currentPage: page,
        foundPosts: foundHeroes,
      },
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({
      status: "Error",
      message: "Server error, please contact admin.",
    });
  }
};

module.exports = {
  heroTest,
  saveHero,
  getHero,
  deleteHero,
  getAllUserHeroes,
};
