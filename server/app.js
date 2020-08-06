const express = require('express');
const config = require("./config");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const comicRouter = require('./api/modules/comic/comic.router');
const chapter2Router = require('./api/modules/chapter2/chapter.router');

mongoose.connect(config.mongoConnectionString);
const PORT =process.env.PORT || 6969;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static('../client'));
app.use('/api/comic', comicRouter);
app.use('/api/chapter', chapter2Router);


app.listen(PORT, function() {
  console.log(`Server is listening on ${PORT}`);
});

