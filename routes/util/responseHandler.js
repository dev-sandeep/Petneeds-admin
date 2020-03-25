/**
 * Responsible push the error message
 * @author Sandeep G
 * @since 20200325
 */
var common = require('./message');

class Response {
    constructor(resp) {
        this.responseObj = resp;
    }

    fail(msg) {
        this.responseObj.send(
            JSON.stringify({
                status: false,
                msg
            })
        );
    }

    failDb() {
        this.responseObj.send(
            JSON.stringify({
                status: false,
                msg: common.DB_ERROR
            })
        );
    }

    failValidation(data) {
        this.responseObj.send(
            JSON.stringify({
                status: false,
                msg: common.VALIDATION_ERROR,
                data
            })
        );
    }

    success(msg, data) {
        this.responseObj.send(
            JSON.stringify({
                status: true,
                msg,
                data
            })
        );
    }

}

module.exports = Response;