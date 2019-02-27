// require express and path
const express = require('express');
const path = require('path');

const app = express();

// defining port
const PORT = process.env.PORT || 3000;

//syncwith database
const db = require('./models');


//seting up server to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// server setup the public directory for static assets usage
app.use(express.static(path.join(__dirname, './public')));

// Routes
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

//Syncs the db
db.sequelize.sync().then(function () {

})

//Starting server on the predefined Port
app.listen(PORT, function () {
    console.log(`App is now listening on PORT ${PORT}`)
});