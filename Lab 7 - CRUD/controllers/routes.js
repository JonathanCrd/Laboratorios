//Jonathan Cardenas - Lab7
const express = require("express");
const characters = require("./characters");

const router = express.Router();

router.get("/persons", characters.getAll);
router.get("/persons/:id", characters.getByID);
router.post("/persons", characters.postCharacter);
router.patch("/persons/:id", characters.patchByID);
router.delete("/persons/:id", characters.deleteCharacter);

module.exports = router;