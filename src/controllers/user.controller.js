const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const db = mongoose.connection;

router.post("/strongPassword", function (req, res) {
  const reqData = req.body
  console.log('reqData :>> ', reqData);
  let data = reqData;
  db.collection("StrongPassword").insertOne(data, function (err, result) {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Item Inserted");
      res.send(reqData);
    }
  });
  
});

router.get("/fetch-StrongPassword", function (req, res) {
    db.collection("StrongPassword").find().toArray((err, data) => {
      if (err) throw err;
      return res.json({
        result: { data }
      });
    });
});

module.exports = router;
