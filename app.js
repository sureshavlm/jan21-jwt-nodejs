const express       = require('express')
const bodyParser    = require('body-parser');
const cors          = require('cors');
const jwt           = require('jsonwebtoken'); //jwt
var expressJWT      = require('express-jwt'); //

const app           = express();
const port          = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//Root - http://localhost:3000/
app.get('/', (req, res) => {
    res.json("Hello World");
});

/* CODE IN BETWEEN */
//SECRET FOR JSON WEB TOKEN
let secret = 'some_secret';

//ALLOW PATHS WITHOUT TOKEN AUTHENTICATION
app.use(expressJWT({ secret: secret})
    .unless(
        { path: [
            '/login'
        ]}
    ));

app.post('/login', (req, res) => {
    console.log("*********** ", req.body);
    let token = jwt.sign(req.body, secret, { expiresIn: '6s'})
    res.status(200).json({"token": token, username: req.body.username, message: 'Login Success!'});
});

/*
app.get('/token/sign', (req, res) => {
    var userData = {
        "name": "Muhammad Bilal",
        "id": "4321"
    }
    let token = jwt.sign(userData, secret, { expiresIn: '60s'})
    res.status(200).json({"token": token, username: userData.name});
});
*/

app.get('/products', (req, res) => {
    res.status(200)
        .json(["Dell 3350", "iMac"]);
});

/* CODE IN BETWEEN */

/* LISTEN */
app.listen(port, function() {
    console.log("Listening to " + port);
});