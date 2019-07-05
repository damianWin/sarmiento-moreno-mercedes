const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// app.get("", (req, res) => {
//     res.send("HEY <br> <strong>HEY</strong>");
// });

// app.get("/help", (req,res) => {
//     res.send("<h1>Helps</h1>")
// })

// app.get("/about", (req,res) => {
//     res.send("about")
// })

app.listen(3000, () => {
    console.log("Server is up on 3000!");
});