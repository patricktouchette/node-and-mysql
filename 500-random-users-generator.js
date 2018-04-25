var faker = require('faker');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'patricktouchette',
    database: 'join_us'
})

//SELECT Count total users
var q = "SELECT COUNT(*) AS total FROM users";
connection.query(q, function(error, results, fields) {
    if (error) throw error;
    console.log(results[0].total);
});

//Insert a random user V1
var person = {email: faker.internet.email()};
connection.query('INSERT INTO users SET ?', person, function(err, result) {
    if (err) throw err;
    console.log(result);
});

//Insert a random users V2
var person = {
        email: faker.internet.email(),
        created_at: faker.date.past()
};
connection.query('INSERT INTO users SET ?', person, function(err, result) {
    if (err) throw err;
    console.log(result);
});

//Insert 500 random users
var data = []
for(var i = 0; i < 500; i++) {
    data.push([faker.internet.email(), faker.date.past()]);
}

var q = 'INSERT INTO users (email, created_at) VALUES ?'
var end_result = connection.query(q, [data], function(err, result) {
    console.log(err);
    console.log(result);
});
//console.log(end_result.sql);
connection.end();

// function
//     console.log(faker.internet.email())
//     console.log(faker.date.past())

// 1. simple query
// var q = 'SELECT CURDATE()';
// connection.query(q, function(error, results, fields) {
//     if (error) throw error;
//     console.log(results);
// })

// var q = "SELECT CURTIME() as time, DATE_FORMAT(CURDATE(), '%Y-%m-%d') as date, NOW() as now";