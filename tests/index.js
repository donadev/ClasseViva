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
          it("should give bad credentials error (bad student code)", function(next) {
              agent.post("/auth/login")
                   .type("form")
                   .send({"school": TEST_SCHOOL})
                   .send({"student_code": TEST_USER + "x"})
                   .send({"password": TEST_PW})
                   .expect('Content-Type', /json/)
                   .expect(200, {
                       success: false,
                       error: "Credenziali errate"
                   }, next);
          });
          it("should give bad credentials error (bad password)", function(next) {
              agent.post("/auth/login")
                   .type("form")
                   .send({"school": TEST_SCHOOL})
                   .send({"student_code": TEST_USER})
                   .send({"password": TEST_PW + "x"})
                   .expect('Content-Type', /json/)
                   .expect(200, {
                       success: false,
                       error: "Credenziali errate"
                   }, next);
          });
          it("should give bad credentials error (bad school code)", function(next) {
              agent.post("/auth/login")
                   .type("form")
                   .send({"school": TEST_SCHOOL + "x"})
                   .send({"student_code": TEST_USER})
                   .send({"password": TEST_PW})
                   .expect('Content-Type', /json/)
                   .expect(200, {
                       success: false,
                       error: "Credenziali errate"
                   }, next);
          });
          it("Should send successfully the phpsessid", function(next) {
              agent.post("/auth/login")
                   .type("form")
                   .send({"school": TEST_SCHOOL})
                   .send({"student_code": TEST_USER})
                   .send({"password": TEST_PW})
                   .expect('Content-Type', /json/)
                   .expect(200)
                   .expect(function(response) {
                       var body = response.body;
                       return body.success && !_.isEmpty(body.data);
                   })
                   .end(next);
          });
    });
