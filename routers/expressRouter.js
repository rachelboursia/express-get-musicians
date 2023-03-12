const express = require('express');
const {Musician} = require("../Musician");
const {sequelize} = require("../db");
const router = express.Router();
const {check, validationResult} = require('express-validator');

//TODO
router.get('/', async (req, res) => {
    const foundMusicians = await Musician.findAll();
    res.json(foundMusicians);
});

router.get('/:id', async (req, res) => {
    const musiciansId = await Musician.findByPk(req.params.id);
    res.json(musiciansId);
});

router.post('/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.json({errors: errors.array()});
    } else {
        await Musician.create
        ({
            name: req.body.name,
            instrument: req.body.instrument 
        });
        const allMusicians = await Musician.findAll();
        res.json(allMusicians);
    }
});

router.put('/:id', async (req, res) => {
    const foundMusician = await Musician.findByPk(req.params.id);
    ({
        name: req.body.name,
        instrument: req.body.instrument
    });
    res.json(foundMusician);
});

router.delete('/:id', async (req, res) => {
    await Musician.destroy({
        where: 
        {
            id: req.params.id
        }
    });
    res.send('Musician is deleted!');
});

module.exports = router;