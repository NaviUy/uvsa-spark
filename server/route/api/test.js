const express = require("express");
const router = express.Router();

router.post("/test", (req, res)=> {
    console.log(req.body)
    res.send("connected")
    res.end();
})

module.exports = router;
