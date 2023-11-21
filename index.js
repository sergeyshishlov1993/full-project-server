const express = require("express");
const cors = require("cors");

const homeRouts = require("./router/home");
const addRouts = require("./router/add");
const allRouts = require("./router/all");
const addImgRouts = require("./router/addImg");
const deletImgRouts = require("./router/deletImg");
const getImgRouts = require("./router/getImg");

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
app.use(express.static("public"));

app.use("/", homeRouts);
app.use("/add", addRouts);
app.use("/all", allRouts);
app.use("/add-img", addImgRouts);
app.use("/delet-img", deletImgRouts);
app.use("/get-img", getImgRouts);

app.listen(PORT);
