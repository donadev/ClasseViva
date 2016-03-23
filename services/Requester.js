var app = require('../app');
var unirest = require("unirest");
module.exports = {
    login(school, username, password) {
        let params = {custcode: school, login: username, password: password};
        return this._request("login.php", "POST", params);
    },
    makePath(value) {
        if(!_.startsWith(value, "/")) value = "/" + value;
        return BASE_PATH + value;
    },
    _request(endpoint, method, params) {
        var url = this.makePath(endpoint);
        var self = this;
        return new Promise((resolve, reject) => {
            var cb = (res) => {
                if(res.error) reject(res);
                else resolve(res);
            };
            switch(method.toLowerCase()) {
                case "get": return self._get(url, params, cb);
                case "post": return self._post(url, params, cb);
            }
        });

    },
    _get(url, params, cb) {
        unirest.get(url)
               .query(params)
               .end(cb);
    },
    _post(url, fields, cb) {
        var request = unirest.post(url);
        var key;
        for(key in fields) {
            request.field(key, fields[key]);
        }
        request.end(cb);
    }
};
