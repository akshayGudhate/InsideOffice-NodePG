require('dotenv').config();                                                     // environment variables
const express = require("express");                                             // express server
const bodyParser = require("body-parser");                                      // body parser parsing request body
const compression = require('compression');                                     // compressed assets
const morgan = require("morgan");                                               // logging for express
const helmet = require('helmet');                                               // set headers for better security
const path = require("path");                                                   // path to get absolute path
const fsextra = require('fs-extra');                                            // file system for node
const fs = require('fs');                                                       // file system for node

const database = require('./src/models/database');                              // initialize database methods
const apiControllers = require('./src/api/apiControllers');                     // controller - apiRoutes
const PORT = process.env.PORT;

const app = express();


/////////////////////////
//   security headers  //
/////////////////////////

app.use(helmet());


///////////////////////
//    compression    //
///////////////////////

app.use(compression());


///////////////////////
//      logging      //
///////////////////////

/** create a write stream (in append mode) */
app.use(
    morgan('combined', {
        stream: fs.createWriteStream(
            path.join(__dirname, 'access.log'), { flags: 'a' }
        )
    })
);


///////////////////////
//    body parser    //
///////////////////////

app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());


///////////////////////
//      uploads      //
///////////////////////

/** create uploads directory if not exist */
const folder = './src/uploads';

if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    fs.mkdirSync('./src/uploads/docs');
    fs.mkdirSync('./src/uploads/images');

    /** copy default images to uploads folder */
    fsextra.copySync(
        path.resolve(__dirname, './src/public/defaultImage.png'), './src/uploads/images/defaultImage.png'
    );
}


/////////////////////////
//         CORS        //
/////////////////////////

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


////////////////////////
//       routes       //
////////////////////////

app.use('/api', apiControllers);


////////////////////////
//    start server    //
////////////////////////

(async () => {
    try {
        await database.initDatabaseTables();
        app.listen(PORT, () => {
            console.log(`Your server is running on link: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
})();