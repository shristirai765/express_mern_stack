const categories = [];

//* getAll
export const getAll = (req,res)=>{
    res.status(200).json({
        message: "",
        success: true,
        data: categories
    })
}

//* get by id
export const getById = (req, res, next)=>{
    const {id} = req.params;

    const category = categories.find((category)=>category._id === Number(id));

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
        })
    }
    res.status(200).json({
        message: "Category by id found",
        success: true,
        data: categories
    });
};
 //* create
export const create = (req, res, next)=>{
    const {name} = req.body;
    if(!name){
        next({
            message: "name required",
            statusCode: 400
        })
    }

    categories.push({
        name,
        createdAt: new Date(Date.now()),
        _id: categories.length+1,

    })
    res.status(201).json({
        message : "products created",
        success: true,
        data: categories[categories.length-1]
    });
    
};

//* update
export const update =  (req, res, next) =>{
    const {id} = req.params;

    const {name} = req.body;
    
    const index = categories.findIndex((category)=>category._id=== Number(id));

    if(index === -1){
        // res.status(404).json({
        //     message: "category not found",
        //     success: "false",
        //     data: null
        // });
        // return;
        next({
            message: " category not found",
            statusCode: 404
        })
    }

    categories[index]={
        ...categories[index],
        name
    };
    res.status(200).json({
        message : "categories updated",
        success: true,
        data: categories[index]
    });
};

//* delete
export const remove = (req, res, next) =>{
    // res.send("<h1>Products deleted</h1>");

    const {id} = req.params;

    const index = categories.findIndex((category)=>category._id === Number(id));

    if(index === -1){
        // res.status(404).json({
        //     message: "category not found",
        //     success: false,
        //     data: null
        // });
        // return;
        next({
            message: " category not found",
            statusCode: 404
        })
    }
    categories.splice(index,1);
    res.status(200).json({
        message : "categories deleted",
        success: true,
        data: null
    });
};