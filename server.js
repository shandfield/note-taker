var express = require("express");
const apiRoutes = require ("./routes/api-routes");
const htmlRoutes = require ("./routes/html-routes");
var app = express();


var PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});