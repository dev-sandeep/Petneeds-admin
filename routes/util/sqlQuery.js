/*
 * Responsible for making SQL query dynamically
 * @author Sandeep G
 * @since 20200325
 */

const baseQuery = {
    insert: {

    }
}

exports.insertQuery = function (myobj, table) {
    var query = `INSERT INTO ${table} `;
    var sql = `INSERT INTO ${tableName} (fname, lname, email, phone, passwd, address, country) VALUES 
    ('${myobj.fname}', '${myobj.lname}', '${myobj.email}', '${myobj.phone}', '${myobj.passwd}', '${myobj.address}', '${myobj.country}')`;

    for (var key in myobj) {
        query += '(fname, lname, email, phone, passwd, address, country) VALUES';
    }
};

