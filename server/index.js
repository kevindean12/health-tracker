const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./models/listenapi').mongoURI;
const exerciseLog = require('./controllers/log');
const planner = require('./controllers/planner');
const admin = require('./controllers/admin');
const users = require('./controllers/users');
const social = require('./controllers/social');
const path = require('path');
const port = 3000;

//mongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log("MongoDB connected"))
    .catch(error => console.log(error));

//CORS
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//authorization through headers
app.use(function(req, res, next) {
    const arr = (req.headers.authorization || "").split(" ");
    if(arr.length > 1 && arr[1] != null){
        req.userID = +arr[1];
    }
    next();
});

//turn off x-powered-by for security per https://expressjs.com/en/advanced/best-practice-security.html
app.disable('x-powered-by');

app
    .use(express.json())
    .use(express.urlencoded({ extended: true}))
    .use(express.static(__dirname + '/../client/dist'))
    .get('/', (req, res) => res.send("Hello world!"))
    .use('/log', exerciseLog)
    .use('/plan', planner)
    .use('/admin', admin)
    .use('/users', users)
    .use('/social', social)

    .use((req, res) => {
        const homepath = path.join(__dirname, '/../client/dist/index.html');
        res.sendFile(homepath);
    })


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));