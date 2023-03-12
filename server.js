const express = require("express");
const app = express();
const {sequelize} = require("./db");
const musicianRouter = require('./routers/expressRouter');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/Musicians', musicianRouter);

app.listen(port, () => {
    sequelize.sync()
    console.log(`Listening on port ${port}`);
});