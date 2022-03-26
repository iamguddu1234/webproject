const express = require("express"); //import express framework
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();//object create to access express features
const port = 3004 //configure port to run service
const mysql = require("./connection").con//import mysql



//use for urlencode
app.use(express.urlencoded())
app.use(express.json())



//Set Templet Engine
app.set("view engine", "hbs")//set hbs templet engin
app.set("views", "./view")// our view file set

// app.use(express.static(__dirname + "/pubic"))//set css main
app.use(express.static("public"))



//app.use(express.static(__dirname + "/pubic"))//set css main



//Routing
app.get("/", (req, res) => { //localhost:3004
    res.render("index")//hbs to convert html render functio
});



//Routing
app.get("/about", (req, res) => { //localhost:3004/about
    res.render("about")//hbs to convert html render function

});



//Routing
app.get("/contact", (req, res) => { //localhost:3004/contact
    res.render("contact")//hbs to convert html render function
});








//saved by get method
// app.get("/add", (req, res) => {
//     //fething data from form
//     //res.send(req.query)

//     //const { name, phone, email, gender } = req.query
//     //fetch data from form id
//     const { name, phone, email, message } = req.query

//     //Sanitization Protected To  XSS....

//     //Table name test -email and phoneno is mysql column
//     let qry = "select * from test where email=? or phoneno=?";

//     mysql.query(qry, [email, phone], (err, results) => {

//         if (err)
//             throw err
//         else {
//             /* Email or Phone Number Already Present In database*/
//             if (results.length > 0) {

//                 res.render("index", { checkmesg: true })

//             } else {

//                 //insert Data to database query
//                 let qry2 = "insert into test values(?,?,?,?)";

//                 mysql.query(qry2, [name, phone, email, message], (err, results) => {
//                     //res.send(results)  //show data in json formt

//                     /* Data Inserted Show*/
//                     if (results.affectedRows > 0) {
//                         //res.send(results)
//                         res.render("index", { mesg: true })
//                     }

//                 })
//             }
//         }
//     })
// });





// post method for data insert
app.post("/add", (req, res) => {

    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    const message = req.body.message

    let a = "insert into data values(?,?,?,?)";

    mysql.query(a, [name, phone, email, message], (err) => {
        if (err)
            throw err
        else {
            res.send("Data Saved")
        }
    })
});



//internship data saved through get method
app.get("/apply", (req, res) => {

    const { inputFullName, inputMobile, inputEmailAddress, inputCourseName, inputAddress, inputState, inputCity, inputZip, gender } = req.query

    let qry = "select * from internship where inputEmailAddress=? or inputMobile=?";

    mysql.query(qry, [inputEmailAddress, inputMobile], (err, results) => {

        if (err)
            throw err
        else {
            /* Email or Phone Number Already Present In database*/
            if (results.length > 0) {

                res.render("contact", { checkmesg: true })

            } else {
                //insert Data to database query

                let qry2 = "insert into internship values(?,?,?,?,?,?,?,?,?)";
                mysql.query(qry2, [inputFullName, inputMobile, inputEmailAddress, inputCourseName, inputAddress, inputState, inputCity, inputZip, gender], (err, results) => {
                    //res.send(results)  //show data in json form

                    /* Data Inserted Show*/

                    if (results.affectedRows > 0) {
                        //res.send(results)
                        res.render("contact", { mesg: true })
                    }

                })
            }
        }
    })

});






//Create server
app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server Is Running")
});