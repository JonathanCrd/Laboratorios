const Character = require("../models/character");

const getAll = function(req, res) {
    Character.find({})
        .then(function(characters) {
        res.send(characters);
        })
        .catch(function(error) {
        res.status(500).send(error);
        });
};

const getByID = function(req, res) {
    const _id = req.params.id;
    Character.findById(_id)
        .then(function(character) {
        if (!character) { //if character is not found
            return res.status(404).send();
        }
        return res.send(character);
        })
        .catch(function(error) {
        return res.status(500).send(error);
        });
};

const postCharacter = function(req, res) {
    const character = new Character(req.body);
    character
        .save()
        .then(function() {
        return res.send(character);
        })
        .catch(function(error) {
        return res.status(400).send(error);
        });
};

const patchByID = function(req, res) {
    const _id = req.params.id;
    const updates = Object.keys(req.body);

    Character.findByIdAndUpdate(_id, req.body)
        .then(function(character) {
        if (!character) { //if character is not found
            return res.status(404).send();
        }
        return res.send(character);
        })
        .catch(function(error) {
        res.status(500).send(error);
        });
};

const deleteCharacter = function(req, res) {
    const _id = req.params.id;

    Character.findByIdAndRemove(_id)
        .then(function(character) {
            if (!character) {
                return res.status(404).send();
            }
            return res.send(character);
        })
        .catch(function(error) {
        res.status(505).send(error);
        });
};

module.exports = {
    getAll,
    getByID,
    postCharacter,
    patchByID,
    deleteCharacter
};