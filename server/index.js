const express = require("express");
const app = express();
const exerciseLog = require('./controllers/log');
const planner = require('./controllers/planner');
const admin = require('./controllers/admin');
const path = require('path');
const port = 3000;

app
    .use(express.json())
    .use(express.urlencoded({ extended: true}))
    .use(express.static(__dirname + '/../client/dist'))
    .get('/', (req, res) => res.send("Hello world!"))
    .use('/log', exerciseLog)
    .use('/plan', planner)
    .use('/admin', admin)

    .use((req, res) => {
        const homepath = path.join(__dirname, '/../client/dist/index.html');
        res.sendFile(homepath);
    })


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));