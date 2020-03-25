/**
 * Responsible push the error message
 * @author Sandeep G
 * @since 20200325
 */
var common = require('./message');
module.exports = {
    resp: '',

    fail: (resp, msg) => {
        this.resp.send(
            JSON.stringify({
                status: false,
                msg
            })
        );
    },

    failDb: resp => {
        this.resp.send(
            JSON.stringify({
                status: false,
                msg: common.DB_ERROR
            })
        );
    },

    failValidation: (resp, data) => {
        this.resp.send(
            JSON.stringify({
                status: false,
                msg: common.VALIDATION_ERROR,
                data
            })
        );
    },

    success: (resp, msg, data) => {
        this.resp.send(
            JSON.stringify({
                status: true,
                msg,
                data
            })
        );
    }
}