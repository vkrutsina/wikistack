var morgan = require("morgan");

const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));
const { db } = require("./models");
db.authenticate().then(() => {
  console.log("connected to the database");
});
const wiki = require("./routes/wiki");
const user = require("./routes/user");

app.use(morgan("dev"));
app.use(express.json());
app.use("/wiki", wiki);
app.use("/user", user);

app.get("/", (req, res) => {
  res.redirect("/wiki");
});
const PORT = 3000;

async function connect() {
  try {
    await db.sync({ force: true });
    //where do stuff
    // await db.close();
  } catch (err) {
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
}

connect();
