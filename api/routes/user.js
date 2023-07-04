const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("User test is successful");
});

router.post("/posttest", (req, res) => {
  const username = req.body.username;
  res.send(`Your username is ${username}`);
});

module.exports = router;
