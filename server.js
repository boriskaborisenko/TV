const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./app.js")
const app = express()

const cors = require('cors')

app.use(cors())



app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use( (req, res, next) => {
    res.header("X-Frame-Options", "*")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true")
    next();
});


routes(app);

const server = app.listen(3333, function () {
    console.log("app running on port. All OK", server.address().port);
});