const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/hall-of-fame",
  {
    useNewUrlParser: true,
  }
);

// require("./routes.apiRoutes")(app);
app.use(require("./routes/apiRoutes.js"));
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
