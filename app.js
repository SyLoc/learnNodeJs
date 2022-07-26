const express = require('express');
const app = express();
const userRoute = require('./routes/user')

const PORT = 8080;

app.use(express.static('public'))

// routes
app.use("/user", userRoute)


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/javascripts/index.html");
})

app.listen(PORT, (error) => {
    if (error) throw error

    console.log(`Express application is running at http://localhost:${PORT}`)
});