//Jonathan Cardenas - Lab7
//Game of Thrones Character
const Mongoose = require("mongoose");

const characterSchema = new Mongoose.Schema({
    name: String,
    age: Number,
    born: String,
    timeline: String,
    alliegance: Array,
    playedBy: String,
    titles: Array,
    father: String,
    mother: String,
    spouse: String
});

const Character = Mongoose.model("Character", characterSchema);

module.exports = Character;