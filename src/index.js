import http from "http";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

//router - same work in modular level given by express

// send - express method 
//* creating express app instance
const app = express();

//* creating http server
const server = http.createServer(app);

app.use(express.json()); // parses the json data into object and attach it into the req body
//? or to read data of request body

//* home  -> get, / => homepage
// app.get(path, handler);
app.get("/", (req, res) => {
    // res.send("<h1>Home page</h1>");
    res.status(200).json({
        message : "server is up and running",
    });
});

//! using route

app.use("/users", userRoutes);

app.use("/products", productRoutes);





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


// http://localhost:8080/users/1?name="John"&page=1&limit=10
//? http - protocol
//? //localhost:8080 - domain name
//? /users/1 - route
//? ?name= "" - query

//req.url
// req.parmas ->{}
// req.query ->{name:"John",page=1&limit=10}
//? ? paxi, & separator
//req.body -> {}

//* REST API - set of rules
//? REST - Representational state transfer

//? api - application programming interface


//? constraints
//* stateless - no management of state in server side 
// when logged in gives a token with login response and user use it as a way to certify the authorization next time
//* client - server architecture
// client - cdn, proxy server, loadbalance, ...- server architecture
// proxy : 
//* layered architecture
//* cacheable response
// Cache- Control

// code on demand 

//* uniform interface
// route naming
// use noun
// plural
// get / getusers === !
// use meaningful http methods -> GET, POST, PUT, PATCH, DELETE
// use meaningful response status code ->
//? 100 - 199 -> informational
//? 200 - 299 -> successful range 
// 200 -> success , 
// 201 -> created (put , post)
//? 300 - 399 -> redirectional
//? 400 - 499 -> client side error .. 404
// 400 -> bad request, 
// 401 -> unauthorized 
// 403 -> foribidden 
// 404 -> not found
//? 500 - 599 -> server side error 
// 500 -> internal server error 
// 502 -: bad gateway



//! endpoint - path 
//* get /users

//! resource
// obj using endpoint can identify

// /dashboard -> {}
// resource lai kun chai format use/ representation garera send garne
// /users -> json, html, xml
