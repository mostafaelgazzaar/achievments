const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const app = express();
const responseHandler = require('./handlers/response-handler');
const db = require('./DB/index')
const UsersRouter = require('./routes/UsersRoutes')
const AchievementRouter = require('./routes/AchivementRoutes')
const port = 4000;


app.use(responseHandler);
app.use(bodyParser.json())
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/users", UsersRouter)
app.use("/achievements", AchievementRouter)


app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});