    var app = require("../app"),
        request = require('supertest'),
        expect = require('expect.js');
    var agent = request.agent(app);
    //those are my ClasseViva credentials... you can enter on my ClasseViva account, I have nothing to hide ;)
    //replace if you want with your credentials
    var TEST_SCHOOL = "pnit0003",
        TEST_USER = "S724407K",
        TEST_PW = "Prova1234";

    describe("auth controller", function() {
          it("should give bad credentials error", function(next) {
              agent.post("/auth/login")
                   .field("school", TEST_SCHOOL)
                   .field("username", TEST_USER + "x")
                   .field("password", TEST_PW)
                   .expect('Content-Type', /json/)
                   .expect(200, {
                       success: false,
                       error: "Credenziali errate"
                   }, next);
          });
          it("should give bad credentials error", function(next) {
              agent.post("/auth/login")
                   .field("school", TEST_SCHOOL)
                   .field("username", TEST_USER)
                   .field("password", TEST_PW + "x")
                   .expect('Content-Type', /json/)
                   .expect(200, {
                       success: false,
                       error: "Credenziali errate"
                   }, next);
          });
          it("should give bad credentials error", function(next) {
              agent.post("/auth/login")
                   .field("school", TEST_SCHOOL + "x")
                   .field("username", TEST_USER)
                   .field("password", TEST_PW)
                   .expect('Content-Type', /json/)
                   .expect(200, {
                       success: false,
                       error: "Credenziali errate"
                   }, next);
          });
          it("should give me the phpsessid", function(next) {
              agent.post("/auth/login")
                   .field("school", TEST_SCHOOL)
                   .field("username", TEST_USER)
                   .field("password", TEST_PW)
                   .expect('Content-Type', /json/)
                   .expect(200, function(body) {
                       return body.success == true && !_.isEmpty(body.data);
                   })
                   .end(next);
          });
    });
