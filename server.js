const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
});

app.get("/musicians/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
});

app.post("/musicians", async (req, res) => {
    const { name, instrument } = req.body;
    try {
        await Musician.create({ name, instrument });
        const allMusicians = await Musician.findAll();
        res.json(allMusicians);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

app.put("/musicians/:id", async (req, res) => {
    const musicianId = req.params.id;
    const { name, instrument } = req.body;
    try {
        const musician = await Musician.findByPk(musicianId);
        if(!musician) {
         res.status(400).json({error: error.message});
        }
        await musician.update({ name, instrument });
        res.json({message: "Musician updated successfully"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

app.delete("/musicians/:id", async (req, res) => {
    const musicianId = req.params.id;
    try {
        const musician = await Musician.findByPk(musicianId);
        if(!musician) {
         res.status(400).json({error: error.message});
        }
        await musician.destroy();
        res.json({message: "Musician deleted successfully"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});
  
app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
});