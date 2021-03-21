const Product=require('../models/product')
const formidable=require('formidable')
const fs=require('fs')
const _=require('lodash')

exports.getProductById=(req,res,next,id)=>{

        Product.findById(id)
        .populate('category')
        .exec((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"unable to get product"
                })
            }
            req.product=product
            next()
        })
}

exports.createProduct=(req,res)=>{

    let form=new formidable.IncomingForm()
    form.keepExtensions=true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"proble with image file"
            })
        }

        const {name,description,price,category,stock}=fields
        
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error:"all fields are required"
            })
        }

        let product=new Product(fields)

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"image size is too big"
                })
            }

            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }

        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"unable to add product"
                })
            }
            res.json(product)
        })
    })

    
}

exports.getProduct=(req,res)=>{
    req.product.photo=undefined
    res.json(req.product)
}

exports.removeProduct=(req,res)=>{
    const product=req.product

    product.remove((err,removedProduct)=>{
        if(err){
            return res.status(400).json({
                error:"unable to add product"
            })
        }
        res.json({
            error:"product Deleted successfully"
        })
    })
}

exports.updateProduct=(req,res)=>{

    let form=new formidable.IncomingForm()
    form.keepExtensions=true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"proble with image file"
            })
        }


        let product=req.product
        product=_.extend(product,fields)

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"image size is too big"
                })
            }

            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }

        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"unable to add product"
                })
            }
            res.json(product)
        })
    })

}

exports.getAllProduct=(req,res)=>{
    let limit=req.query.limit?parseInt(req.query.limit):8
    let sortBy=req.query.sortBy?req.query.sortBy:"_id"

    Product.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"unable to get products"
            })
        }
        res.json(products)
    })
}

exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("conntentType",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.getAllUniqueCategories=(req,res)=>{

    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"No category Found"
            })
        }
        res.json(category)
    })
}

exports.updateStock=(req,res,next)=>{
    let myOpertations=req.body.order.products.map((product)=>{
        return {
            updateOne:{
                filter:{_id:product._id},
                update:{$inc:{stock:-product.count,sold:+product.count}}
            }
        }
    })

    Product.bulkWrite(myOpertations,{},(err,result)=>{
        if(err){
            return res.status(400).json({
                error:"update stock failed"
            })
        }
        next()
    })
}