/**
 * Responsible push the error message
 * @author Sandeep G
 * @since 20200325
 */

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
                msg: 'DB error, check logs to know more'
            })
        );
    },

    failValidation: (resp, data) => {
        this.resp.send(
            JSON.stringify({
                status: false,
                msg: 'Validation error',
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