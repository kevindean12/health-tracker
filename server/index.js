const express = require("express");
const app = express();
const exerciseLog = require('./controllers/log');
const planner = require('./controllers/planner');
const admin = require('./controllers/admin');
const users = require('./controllers/users');
const path = require('path');
const port = 3000;

//CORS
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//authorization through headers
app.use(function(req, res, next) {
    console.log(req.headers.authorization);
    const arr = (req.headers.authorization || "").split(" ");
    if(arr.length > 1 && arr[1] != null){
        req.userID = +arr[1];
    }
    next();
});

app
    .use(express.json())
    .use(express.urlencoded({ extended: true}))
    .use(express.static(__dirname + '/../client/dist'))
    .get('/', (req, res) => res.send("Hello world!"))
    .use('/log', exerciseLog)
    .use('/plan', planner)
    .use('/admin', admin)
    .use('/users', users)

    .use((req, res) => {
        const homepath = path.join(__dirname, '/../client/dist/index.html');
        res.sendFile(homepath);
    })


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));