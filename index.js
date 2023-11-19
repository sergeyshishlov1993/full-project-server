const express = require("express");
const cors = require("cors");
const homeRouts = require("./router/home");
const addRouts = require("./router/add");
const allRouts = require("./router/all");

const app = express();
app.use(cors());

const PORT = 4000;

const corsOptions = {
  origin: "http://localhost:3000", // Разрешенный адрес вашего клиента
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/", homeRouts);
app.use("/add", addRouts);
app.use("/all", allRouts);

app.listen(PORT);
