const express = require("express");
const app = express();
const bodyparser = require("body-parser");
var cors = require("cors");
const swaggerDocs = require("./utils/swagger");
const pages = require("./routes/pages.routes");
const auth = require("./routes/auth.routes");
const column = require("./routes/column.routes");
const content = require("./routes/content.routes");
require("dotenv").config();
const path = require("path");

//use express static folder
app.use(express.static("public"));
// app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
// body-parser middleware use
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use("/auth", auth);
app.use("/page", pages);
app.use("/row", require("./routes/row.routes"));
app.use("/column", column);
app.use("/content", content);
//create connection
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT} on ${process.env.HOST}`);
  swaggerDocs(app, PORT);
});
