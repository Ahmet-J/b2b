import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";
const prisma = new PrismaClient()
import cloudinary from '../config/cloudinary'


// get all oders
export const getallproducts = async(req: Request , res: Response)=> {
    try {
        const all = await prisma.product.findMany()
        if(!all || all.length === 0){
            return res.status(400).json({message: "There is no products.."})
        }
        res.status(200).json({message: "All products displayed successfully.", data: all})
    } catch (error) {
        res.status(500).json({message: "internal server error", error})
    }
}


// create product

export const newproduct = async (req: Request, res: Response) => {
  try {
    console.log("✅ req.body:", req.body)
    console.log("✅ req.files:", req.files)

    const {
      supplierId, categoryId, name, slug, sku,
      description, specifications, price, currency,
      minOrderQty, stock
    } = req.body

    if (!supplierId || !name || !slug || !price) {
      return res.status(400).json({ message: "Please enter valid credentials", success: false })
    }

    const check = await prisma.product.findFirst({ where: { slug } })
    if (check) {
      return res.status(400).json({ message: "This product is already registered", success: false })
    }

    // images — file.path ayaa cloudinary url ku jira
    let uploadedImages: object[] = []
    if (req.files && Array.isArray(req.files)) {
      uploadedImages = req.files.map((file: any, index: number) => ({
        url: file.path,
        alt: file.originalname,
        isPrimary: index === 0,
        order: index
      }))
    }

    const newProduct = await prisma.product.create({
      data: {
        supplierId: Number(supplierId),
        categoryId: categoryId ? Number(categoryId) : null,
        name,
        slug,
        sku,
        description,/// <reference path="" />
        
        specifications,
        price: Number(price),
        currency: currency ?? 'USD',
        minOrderQty: minOrderQty ? Number(minOrderQty) : 1,
        stock: stock ? Number(stock) : 0,
        images: uploadedImages,
        
      }
    })

    res.status(201).json({ message: "New product registered successfully", data: newProduct, success: true })

  } catch (error) {
    console.log("❌ FULL ERROR:", error)
    res.status(500).json({ message: "Internal server error", error })
  }
}

// update order
export const updateproduct = async( req: Request , res: Response)=> {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "Please Provide valid crendentials"})
        }
        const {   supplierId , categoryId  ,name      , slug        ,sku        ,description   ,specifications ,price      ,currency   ,minOrderQty   ,stock   ,images  , savedBy  } = req.body
        if(!supplierId || !categoryId || !name || !slug || !sku || !description || !specifications || !price || !currency || !minOrderQty || !stock || !images || !savedBy){
            return res.status(400).json({message: "Please provide vlaid credentials"})
        }

        const check = await prisma.product.findFirst({
            where:{
                id: +id
            }
        })
        if(!check){
            return res.status(400).json({message: "This product is not found"})
        }

        const updatingproduct = await prisma.product.update({
            where : {
                id : +id
            },
            data: {
                     supplierId , categoryId  ,name      , slug        ,sku        ,description   ,specifications ,price      ,currency   ,minOrderQty   ,stock    ,   images: images ?? []  
            }
        })
          res.status(200).json({message: "This product is updating successfully", data: updatingproduct, success: true})
    } catch (error) {
        res.status(500).json({message: "internal server error", error})
    }
}


// deleting  product
export const deleteproduct = async( req: Request , res: Response)=> {
    try {
        const { id} = req.params
        if(!id){
            return res.status(400).json({message: "Please provide valid ID"})
        }

        const check = await prisma.product.findFirst({
            where: {
                id : +id
            }
        })
        if(!check){
            return res.status(400).json({message: "This product it doesnot exist"})
        }

        const deletingproduct = await prisma.order.delete({
            where: {
                id : +id
            }
        })
        res.status(200).json({message: "This product is deleting successfully", data: deletingproduct, success: true})
    } catch (error) {
        res.status(500).json({message : "internal server error", error})
    }
}


// get one product
export const getoneproduct = async( req: Request , res: Response)=> {
try {
    const {id} = req.params
    if(!id){
        return res.status(400).json({message: "Please provide valid ID"})
    }

    const check = await prisma.product.findFirst({
        where : {
 id: +id
        }
       
    })
    if(!check){
        return res.status(400).json({message: "This product is not found"})
    }
    res.status(200).json({message: "One product is displayed successfully", data: check , success:  true})
} catch (error) {
    res.status(500).json({message: "internal server error", error})
}
}


// Backend - removeproduct function
export const removeproduct = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "Please provide valid ID"})
        }

        const check = await prisma.product.findFirst({
            where: { id: +id }
        })

        // ✅ Beddel 400 → 200
        if(check?.is_deleted === true){
            return res.status(200).json({
                message: "This product is removed successfully",
                data: check
            })
        }

        if(!check){
            return res.status(400).json({message: "This product is not found"})
        }

        const removingproduct = await prisma.product.update({
            where: { id: +id },
            data: { is_deleted: true }
        })
        
        res.status(200).json({
            message: "This order is removed successfully", 
            data: removingproduct
        })
    } catch (error) {
        res.status(500).json({message: "internal server error", error})
    }
}

// restore order
export const restoreproduct = async(req: Request , res: Response)=> {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "pLease provide valid ID"})
        }
      const check = await prisma.product.findFirst({
        where : {
            id : +id
        }
      })

      if(check?.is_deleted === false){
        return res.status(400).json({message : "This product is already restored before"})
      }

      if(!check){
        return res.status(400).json({message: "This product is not found"})
      }

      const restoringprodduct = await prisma.product.update({
        where : {
            id : +id
        },
        data: {
            is_deleted : false
        }
      })
      res.status(200).json({message: "This product is restored successfully", data: restoringprodduct, success: true})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
    }
}

// trash
export const trashproduct = async(req: Request , res: Response)=> {
    try {
        const all = await prisma.product.findMany({
            where: {
                is_deleted: true
            }
        })
        // ✅ Ka saar error-ka 400, hadday maran tahayna soo celi []
        res.status(200).json({
            mesage: "All trash products are displayed successfully", 
            data: all,  // Soo celi array maran haddii aysan jirin
            success: true
        })
    } catch (error) {
        res.status(500).json({mesage: "internal server error", error})
    }
}