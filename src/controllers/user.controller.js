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

router.post("/fetch-StrongPassword", function (req, res) {
  const pageNo = parseInt(req.query.pageNo);
  const offSet = parseInt(req.query.offSet);
  const status = req.query.status;
  const query = {};
  if (status != "ALL") {
    query["status"] = status
  }

  db.collection("BlockUpi").countDocuments(query, (err, totalElements) => {
    if (err) throw err;
    const totalPages = Math.ceil(totalElements / offSet);
    const options = {
      skip: (pageNo) * offSet,
      limit: offSet,
    };

    db.collection("BlockUpi").find(query, options).toArray((err, data) => {
      if (err) throw err;
      return res.json({
        result: {
          data,
          pagination: {
            pageNo,
            offSet,
            totalElements,
            totalPages,
          }
        }
      });
    });
  });
});

module.exports = router;
