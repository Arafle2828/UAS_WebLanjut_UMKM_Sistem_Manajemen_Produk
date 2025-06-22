const db = require('../config/db');

exports.selectAll = (table, where, cb) => {
  const query = `SELECT * FROM ${table} WHERE ${where}`;
  db.query(query, (err, result) => {
    if (err) cb(err, null);
    else cb(null, result);
  });
};
