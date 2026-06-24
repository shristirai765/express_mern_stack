import http from "http";
import express from "express";

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
    res.send("<h1>Users Page</h1>");
});

//* create
app.post("/users", (req, res) =>{
    res.send("<h1>Users created</h1>");
});

//* update
app.put("/users", (req, res) =>{
    res.send("<h1>Users updated</h1>");
});

//* delete
app.delete("/users", (req, res) =>{
    res.send("<h1>Users deleted</h1>");
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