let router = require("express").Router(); //Router method returns an object that contains/allows us to use HTTP requests.
/*
-POST
-PUT
-DELETE
-GET
*/

//grabbing router, using post method (which allows us to "post" to the database. Storing information for later.)
//first argument is relative pathway, second is a callback function. req and res stands for request and response
router.post("/post", function (req, res) {
    let response = {
        message: "This is from the post request"
    };
    res.json(response); //.json() method sends a JSON response.
});

module.exports = router; //Exporting the modules for usage outside of this file.