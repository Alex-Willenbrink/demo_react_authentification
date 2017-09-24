const express = require("express");
const server = express();

server.set("port", process.env.PORT || 3001);

// for parsing json data sent from client side
const bodyParser = require("body-parser");
server.use(bodyParser.json());

const cookieParser = require("cookie-parser");
server.use(cookieParser());

// WE NEED THIS OR WE CAN'T SEND ANY FETCH REQUESTS TO THE server
const cors = require("cors");
server.use(cors());

const routes = require("./routes");
server.use("/", routes);

server.listen(server.get("port"), () =>
  console.log(`listening on ${server.get("port")}`)
);
