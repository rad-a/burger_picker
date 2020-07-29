// ==== Dependencies ====
const express = require("express");

const router = express.Router();

const burger = require("../models/burger.js");

// router.get("/", function(req, res) {
//     res.redirect("/burgers");
// });

//Route to index
router.get("{/|/burgers}", (req, res) => {
  burger.selectAll(function (burgerData) {
    let hbsObject = { burgers: burgerData };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burger", (rres, req) => {
  burger.insertOne(
    ["burgerName", "devoured"],
    [req.body.burgerName, req.body.devoured],
    function (result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertID });
      console.log(result);
      res.redirect("/");
      res.status(200).end();
    }
  );
});

router.put("/burgers/:id", (req, res) => {
  let condition = "ID = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        //If no rows were changed, then ID must not exist, so return 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/burgers/:id", (req, res) => {
  let condition = "ID = " + req.params.id;

  console.log("Deleting condition", condition);

  burger.deleteOne(condition, function (result) {
    if (result.changedRows === 0) {
      // If no rows were changed, then ID must not exits, so return 404
      return res.status(404).end();
    } else {
      res.status(202).end();
    }
  });
});

module.exports = router;
