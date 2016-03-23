var boot = require('../app').boot,
    shutdown = require('../app').shutdown,
    port = require('../app').port,
    superagent = require('superagent'),
    expect = require('expect.js');

    describe('server', function () {
      before(boot);
      after(shutdown);
    });
