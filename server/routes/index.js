const router = require("express").Router();
const {
  addUser,
  generateUserToken,
  validateUserToken,
  validateUser
} = require("../database");

router.post("/login", (req, res) => {
  try {
    validateUser(req.body.email, req.body.password);
    const token = generateUserToken(req.body.email, req.body.password);
    const userData = validateUserToken(token);

    // attach token as a cookie on the response (res)
    res.cookie("token", token);

    // send email back to client as json data
    res.json({ email: userData.email, error: null });
  } catch (error) {
    res.cookie("token", null);
    res.json({ error, email: null });
  }
});

router.post("/register", (req, res) => {
  try {
    addUser(req.body.email, req.body.password);
    const token = generateUserToken(req.body.email, req.body.password);
    const userData = validateUserToken(token);

    // attach token as a cookie on the response (res)
    res.cookie("token", token);

    // send email back to client as json data
    res.json({ email: userData.email, error: null });
  } catch (error) {
    res.cookie("token", null);
    res.json({ error, email: null });
  }
});

router.post("/authenticate", (req, res) => {
  try {
    if (!req.cookies.token) throw new Error("no token present");
    let userData = validateUserToken(req.cookies.token);

    res.json({ email: userData.email, error: null });
  } catch (error) {
    res.cookie("token", null);
    res.json({ error, email: null });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.cookie("token", null);
    res.json({ error: "user has logged out successfully", email: null });
  } catch (error) {
    res.cookie("token", null);
    res.json({ error, email: null });
  }
});

module.exports = router;
