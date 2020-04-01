const express = require('express');
const userRouter = require('./routers/user');
const eventRouter = require('./routers/event');
const bodyParser = require('body-parser');
const port = process.env.PORT;
var cors = require('cors');
require('./db/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(eventRouter);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});


