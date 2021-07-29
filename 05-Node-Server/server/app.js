const { request } = require("express");
let express = require("express");
let app = express();
const sequelize = require("./db");

let journal = require('./controllers/journalcontroller');
let user = require("./controllers/usercontroller");

sequelize.sync({force: true});

app.use(express.json());


// app.use('/test', function(req, res) {
//     res.send("This is a message from the test endpoint on the server!");
// })

// app.use("/marnel", function(req, res) {
//     res.send("My name is Marnel Rahimi and I am 42 years old.");
// });

//Have endpoint of journal/practice
//send a response from that endpoint (This is a practice route)

app.use("/journal", journal);
app.use("/user", user);


app.listen(3000, function() {
    console.log("App is listening on port 3000");
});
