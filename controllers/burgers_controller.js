// ==== Dependencies ====
const express = require("express");

const router = express.Router();

const burger = require("../models/burger.js");

//Route to index
router.get("/burgers", (req, res) => {
  burger.selectAll(function (burgerData) {
    let hbsObject = { burgers: burgerData };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers", (req, res) => {
  burger.insertOne(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function (result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertID });
      console.log(result);
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.redirect("/");
        res.status(200).end();
      }
    }
  );
});

router.put("/burgers/:id", (req, res) => {

  console.log("LOGGING ID FOR TESTING" + req.params.id)

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

module.exports = router;
