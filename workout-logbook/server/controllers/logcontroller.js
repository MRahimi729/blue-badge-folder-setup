let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
let Log = require('../db').import('../models/log');

router.get('/practice', validateSession, function(req, res)
{
    res.send('Hey!! This is a practice route!')
});

/***LOG CREATE***/
router.post("/", validateSession, (req, res) => {
    const logEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err}))
});

/***GET LOG BY ID***/
router.get("/:id", (req, res) => {
    Log.findAll({where: {id: req.params.id}})
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

/***GET ENTRIES BY USER***/
router.get("/", validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner_id: userid }
    })
      .then(logs => res.status(200).json(logs))
      .catch(err => res.status(500).json({ error: err }))
});

/***UPDATE ENTRY***/
router.put("/:id", validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id
    };

    const query = { where: {id: req.params.id, owner_id: req.user.id } };

    Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err}));
});

/***DELETE ENTRY***/
router.delete("/:id", validateSession, function (req, res) {
    const query = {where: { id: req.params.id, owner_id: req.user.id } };

    Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router