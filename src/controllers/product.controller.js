import mongoose from "mongoose";

// const products = [];

//! product schema
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 3,
    },
    brand:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    }
},{timestamps: true});

//! creating product model (reference for crud too)
const Product = mongoose.model("product", productSchema);


export const getAll = async (req, res, next) =>{
    // res.send("<h1>All products</h1>");
    try{
        console.log("get all product");
        console.log(req.user);

        const product = await Product.find({});

        res.status(200).json({
            message : "all products",
            success: true,
            data: products,
    });
    }catch(error){
        next(error);
    }
};

export const getById = async (req, res, next) =>{
    // res.send("<h1>All products</h1>");

    try{
        const {id} = req.params;
        // const product = products.find((product)=> product._id === Number(id));

        const product = await Product.findOne({_id: id})

        if(!product){
            // res.status(404).json({
            //     message : `product not found `,
            //     success: false,
            //     data: null
            // });
            // return;
            next({
                message : `product not found `,
                statusCode: 404
            });
        }
        res.status(200).json({
                message : `product fetched by {id} `,
                success: true,
                data: product
            });
    }catch(error){
        next(error);
    }
    
};


export const create = async (req, res, next) =>{
    // res.send("<h1>Products created</h1>");
    //! check authentication
    //! authorize
    try{
        const {name, brand, price} = req.body;
        if(!name){
            next({
                message: "name required",
                statusCode: 400
            });
            return;
        }
        if(!brand){
            next({
                message: "brand required",
                statusCode: 400
            });
            return;
        }
        if(!price){
            next({
                message: "price required",
                statusCode: 400
            });
            return;
        }

        const NewProduct = await Product.create({name, brand, price});
        // products.push({
        //     name,
        //     brand,
        //     price,
        //     createdAt: new Date(Date.now()),
        //     _id: products.length+1,

        // })

        res.status(201).json({
            message : "products created",
            success: true,
            data: NewProduct
        });
    }catch(error){
        next(error);
    }
};


export const update = async (req, res, next) =>{
    // res.send("<h1>Products updated</h1>");
    try{
        const {id} = req.params;
        // console.log(id)

        const {name, brand, price} = req.body;
        
        // const index = products.findIndex((product)=>product._id=== Number(id));
        const updatedProduct = await Product.findByIdAndUpdate({_id: id}, {name, brand, price});

        if(!updatedProduct){
            // res.status(404).json({
            //     message: "product not found",
            //     success: "false",
            //     data: null
            // });
            // return;
            next({
                message: "product not found",
                statusCode: 404
            });
            return;
        }

        // products[index]={
        //     ...products[index],
        //     name,
        //     brand,
        //     price
        // };
        res.status(200).json({
            message : "products updated",
            success: true,
            data: updatedProduct,
        });
    }catch(error){
        next(error);
    }
};


export const remove = async (req, res, next) =>{
    // res.send("<h1>Products deleted</h1>");

   try{
        const {id} = req.params;

        // const index = products.findIndex((product)=>product._id === Number(id));
        const deletedProduct = await Product.findByIdAndDelete({_id: id});

        if(!deletedProduct){
            // res.status(404).json({
            //     message: "product not found",
            //     success: false,
            //     data: null
            // });
            // return;
            next({
                message: "product not found",
                statusCode: 404
            });
            return;
        }
        // products.splice(index,1);
        res.status(200).json({
            message : "products deleted",
            success: true,
            data: null
        });
   }catch(error){
    next(error);
   }
};