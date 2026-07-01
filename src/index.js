import http from "http";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import {connectDatabase} from "./config/db.config.js";

//router - same work in modular level given by express

// send - express method 
//* creating express app instance
const app = express();

//* creating http server
const server = http.createServer(app);

//* connect database
connectDatabase();

const middleware = (req, res, next)=>{
    console.log("middleware 1");
    next();
};

//! using middleware

app.use(middleware);
app.use((req, res, next)=>{
    console.log("middleware 2");
    req.user = {
        name: "John Doe"
    }
    next();
});

app.use((req, res, next)=>{
    // console.log("middleware 3");
    // console.log(req.user);
    if(req.user){
        req.user = null;
        next();
    }else{
        res.status(401).json({
        message: "unauthorized access denied",
    });
    }
});


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

app.use("/categories", categoryRoutes);



//
server.listen(8080, "localhost", ()=>{
    //127.0.0.1- localhost
    console.log(`server is running at http://localhost:8080`); //ip address + port
    console.log("press ctrl+c to close the server");
});

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err?.statusCode ?? 500).json({
        message: err?.message ?? "something went wrong",
        success: false,
        data: null,
    });
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


//* middleware
//? is a function execute between req-res cycle
//? 1. has access to req obj, res obj, & next function
//? 2. can execute own logic
//? 3. can modify req & res object
//? 4. can end req-res cycle

//? if any logic euta vanda badi repeat vako xa vane in api (controller)
//? then it is implemented using middleware

//* types of middlewares
//* custom middleware
//? 1. application level middleware (every req ma impl attach to app
//? 2. route level middleware- kunai euta route ma matra
//? 3. error handler middleware- error handle in global level
// (err, req, res, next)=>{}
//? automatically next ma pass hudeina 
//? orderly pass cannot skip mid1 -> mid2
// req -> mid1 -> mid2 -> mid3 -> midn -> controller
//* third-party middleware - (multer) 

//* mongodb
//? noSql database (unstructured)
//? document format
//? no normalization concept
//? flexible 

//!sql - tabular form

//? terms (sql -> noSql)
// database -> database
// table -> collection
// column -> field
// row -> document
// entity -> module/schema
