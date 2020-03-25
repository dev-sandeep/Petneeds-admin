/*
 * Responsible for creating dynamic queries
 * @author Sandeep G
 * @since 20200324
 */

module.exports = {
    insertQuery: (tableName, colObj) => {

        let sql = 'INSERT INTO ::table (::column) VALUES (::values)';

        let columns = Object.keys(colObj).join(", ");
        let values = Object.values(colObj).join("', '");
        values = `'${values}'`;

        sql = sql.replace('::table', tableName)
            .replace('::column', columns)
            .replace('::values', values);

        return sql;
    }
}