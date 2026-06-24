import http from "http";
import express from "express";

// send - express method 
//* creating express app instance
const app = express();


//* creating http server
const server = http.createServer(app);

//* home  -> get, / => homepage
// app.get(path, handler);
app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

//! CRUD users
//* get all users
app.get("/users", (req, res) =>{
    // res.send("<h1>Users Page</h1>");
    res.json({
        message : "all users",
        success: true,
        data:[{
            _id: 1,
            name: "John Doe",
            email: "j@gmail.com"

        },
        {
            _id: 2,
            name: "John",
            email: "jj@gmail.com"
        }
    ]
    });
});

//* create
app.post("/users", (req, res) =>{
    // res.send("<h1>Users created</h1>");
    res.json({
        message : "user created",
        success: true,
        data:{
            _id: 3,
            name: "Lucy",
            email: "l@gmail.com"

        }
    });
});

//* update
app.put("/users", (req, res) =>{
    // res.send("<h1>Users updated</h1>");
    res.json({
        message : "user updated",
        success: true,
        data:{
            _id: 1,
            name: "John Doe update",
            email: "j@gmail.com"

        }
    });
});

//* delete
app.delete("/users", (req, res) =>{
    // res.send("<h1>Users deleted</h1>");
    res.json({
        message : "user deleted",
        success: true,
        data: null
    });
});

//! CRUD products

app.get("/products", (req, res) =>{
    res.send("<h1>All products</h1>");
});

app.post("/products", (req, res) =>{
    res.send("<h1>Products created</h1>");
});

app.put("/products", (req, res) =>{
    res.send("<h1>Products updated</h1>");
});

app.delete("/products", (req, res) =>{
    res.send("<h1>Products deleted</h1>");
});

//
server.listen(8080, "localhost", ()=>{
    //127.0.0.1- localhost
    console.log(`server is running at http://localhost:8080`); //ip address + port
    console.log("press ctrl+c to close the server");
});

//? expressJs / nestjs
//? opiniated - strict, must follow rules
// one req one handler
// get /users ->handler

//middleware - function
// by default handles error