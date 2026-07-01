import e from "express";
import mongoose from "mongoose";

// const categories = [];

//* category schema
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 3,
    }
},{timestamps: true});

//! creating category model (reference for crud too)
const Category = mongoose.model("category", categorySchema);

//* getAll
export const getAll = async (req, res, next)=>{
   try{
        const category = await Category.find({});
        res.status(200).json({
            message: "",
            success: true,
            data: category
        });
   }catch(error){
    next(error);
   }
}

//* get by id
export const getById = async (req, res, next)=>{
    try{
        const {id} = req.params;

        // const category = categories.find((category)=>category._id === Number(id));
        const category = await Category.findOne({_id: id});

        if(!category){
            // res.status(404).json({
            //     message: "Category not found",
            //     success: false,
            //     data: null
            // });
            // return;
            next({
                message: "category not found",
                statusCode: 404
            });
            return;
        }
        res.status(200).json({
            message: "Category by id found",
            success: true,
            data: category
        });
    }catch(error){
        next(error);
    }
};
 //* create
export const create = async (req, res, next)=>{
    try{
        const {name} = req.body;
        if(!name){
            next({
                message: "name required",
                statusCode: 400
            });
            return;
        }

        // categories.push({
        //     name,
        //     createdAt: new Date(Date.now()),
        //     _id: categories.length+1,

        // })
        const newCategory = await Category.create({name});
        res.status(201).json({
            message : "products created",
            success: true,
            data: newCategory
        });
    }catch(error){
        next(error);
    }
    
};

//* update
export const update = async (req, res, next) =>{
    try{
        const {id} = req.params;

        const {name} = req.body;
        
        // const index = categories.findIndex((category)=>category._id=== Number(id));
        const updatedCategory = await Category.findByIdAndUpdate({_id: id}, {name});

        if(!updatedCategory){
            // res.status(404).json({
            //     message: "category not found",
            //     success: "false",
            //     data: null
            // });
            // return;
            next({
                message: " category not found",
                statusCode: 404
            });
            return;
        }

        // categories[index]={
        //     ...categories[index],
        //     name
        // };
        res.status(200).json({
            message : "categories updated",
            success: true,
            data: updatedCategory
        });
    }catch(error){
        next(error);
    }
};

//* delete
export const remove = async (req, res, next) =>{
    // res.send("<h1>Products deleted</h1>");

    try{
        const {id} = req.params;

        // const index = categories.findIndex((category)=>category._id === Number(id));

        const deletedCategory = await Category.findByIdAndDelete({_id: id});

        if(!deletedCategory){
            // res.status(404).json({
            //     message: "category not found",
            //     success: false,
            //     data: null
            // });
            // return;
            next({
                message: " category not found",
                statusCode: 404
            });
            return;
        }
        // categories.splice(index,1);
        res.status(200).json({
            message : "categories deleted",
            success: true,
            data: null
        });
    }catch(error){
        next(error);
    }
};