const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
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

app.listen(port, () => {
    console.log(`Server is up on ${port}!`);
});