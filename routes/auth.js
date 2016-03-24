var express = require('express')
var Requester = require("../services/Requester");
var router = express.Router();
router.post('/login', (req, res, next) => {
  var school = req.body.school;
  var code = req.body.student_code;
  var password = req.body.password;
  Requester.login(school, code, password).then((response) => {
      if(response.status == 302) res.success(response.cookies["PHPSESSID"]);
      else next("Credenziali errate");
  }).catch((response) => {
      next(response.error);
  });
});

module.exports = router;
