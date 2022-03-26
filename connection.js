const mysql = require("mysql")//import mysql

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "pass",
    database: "website",
    port: 3306
});

con.connect((err) => {

    if (err) {
        throw err;
      }
    
      console.log("Connection Create");
    });
//     if (err) throw err;
//     console.log("Conection create");
// });

module.exports.con = con;