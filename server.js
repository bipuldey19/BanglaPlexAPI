const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apicache = require("apicache");
const app = express();

const port = 3000;

let cache = apicache.middleware;
app.use(cors());
app.use(morgan("tiny"));
app.use(cache("12 hours"));

let index = require("./routes/index");
app.use(index);

let info = require("./routes/info");
app.use(info);

let search = require("./routes/search");
app.use(search);


app.listen(port, () => console.log(`App listening on port ${port}!`));
