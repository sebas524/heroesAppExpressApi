const express = require("express");
const router = express.Router();
const HeroController = require("../controllers/hero");
const authMiddleware = require("../middlewares/auth");

// * define routes:
router.get("/hero-test", HeroController.heroTest);
router.post("/save", authMiddleware.auth, HeroController.saveHero);
router.get("/getHero/:id", authMiddleware.auth, HeroController.getHero);
router.delete("/delete/:id", authMiddleware.auth, HeroController.deleteHero);
router.get(
  "/getAllUserHeroes/:id",
  authMiddleware.auth,
  HeroController.getAllUserHeroes
);

// * export router
module.exports = router;
