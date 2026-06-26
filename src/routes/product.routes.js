import express from 'express';

const router = express.Router();

const products = [];


//! CRUD products
//* get all 
router.get("/", (req, res) =>{
    // res.send("<h1>All products</h1>");
    res.status(200).json({
        message : "all products",
        success: true,
        data: products,
    });
});

//* get by id
router.get("/:id", (req, res) =>{
    // res.send("<h1>All products</h1>");

    const {id} = req.params;
    const product = products.find((product)=> product._id === Number(id));

    if(!product){
        res.status(404).json({
            message : `product not found `,
            success: false,
            data: null
        });
        return;
    }
    res.status(200).json({
            message : `product fetched by {id} `,
            success: true,
            data: products
        });
    
});

router.post("/", (req, res) =>{
    // res.send("<h1>Products created</h1>");
    const {name, brand, price} = req.body;
    products.push({
        name,
        brand,
        price,
        createdAt: new Date(Date.now()),
        _id: products.length+1,

    })
    res.status(201).json({
        message : "products created",
        success: true,
        data:products[products.length-1]
    });
});

router.put("/:id", (req, res) =>{
    // res.send("<h1>Products updated</h1>");
    const {id} = req.params;
    console.log(id)

    const {name, brand, price} = req.body;
    
    const index = products.findIndex((product)=>product._id=== Number(id));
    console.log(index);

    if(index === -1){
        res.status(404).json({
            message: "product not found",
            success: "false",
            data: null
        });
        return;
    }

    products[index]={
        ...products[index],
        name,
        brand,
        price
    };
    res.status(200).json({
        message : "products updated",
        success: true,
        data: products[index]
    });
});

router.delete("/:id", (req, res) =>{
    // res.send("<h1>Products deleted</h1>");

    const {id} = req.params;

    const index = products.findIndex((product)=>product._id === Number(id));

    if(index === -1){
        res.status(404).json({
            message: "product not found",
            success: false,
            data: null
        });
        return;
    }
    products.splice(index,1);
    res.status(200).json({
        message : "products deleted",
        success: true,
        data: null
    });
});

export default router;