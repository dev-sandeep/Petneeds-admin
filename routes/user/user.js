/**
 * all the common user classes goes here
 * @author Sandeep G
 * @since 20150325
 */
var crud = require('./../util/crud.js');
module.exports = {
    check: (token) => {
        return new Promise((resolve, reject) => {
            crud.isExist(common.table.USER_SESSION, 'token', token).then((res) => {
                resolve(res);
            });
        }, (e) => {
            reject(e)
        });
    }
}