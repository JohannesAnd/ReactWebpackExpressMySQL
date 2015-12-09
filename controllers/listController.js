var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'johannes',
    database : 'list'
});

connection.connect();

exports.getPersons = function getPersons(req, res, next) {
    "use-strict";
    connection.query('SELECT * FROM persons', function(err, rows, fields) {
        if (err) {return next(err)};
        res.json({data: rows})
    });
};

exports.addPerson = function addPerson(req, res, next) {
    "use-strict";
    connection.query('INSERT INTO persons SET ?', req.body, function(err, rows, fields) {
        if (err) {return next(err)}
        res.json(rows);
    });
};
exports.removePerson = function removePerson(req, res, next) {
    "use-strict";
    connection.query('DELETE FROM persons WHERE id=?', req.body.id, function(err, rows, fields) {
        if (err) {return next(err)}
        res.json(rows);
    });
};
exports.increase = function increase(req, res, next) {
    "use-strict";
    console.log(req.params.id);
    connection.query('UPDATE persons SET score = score +1 WHERE id=?', req.params.id, function(err, rows, fields) {
        if (err) {return next(err)}
        res.json(rows);
    });
};
exports.decrease = function decrease(req, res, next) {
    "use-strict";
    connection.query('UPDATE persons SET score = score -1 WHERE id=?', req.params.id, function(err, rows, fields) {
        if (err) {return next(err)}
        res.json(rows);
    });
};