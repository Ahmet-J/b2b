import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";
const prisma = new PrismaClient()


// get all oders
export const getallorders = async(req: Request , res: Response)=> {
    try {
        const all = await prisma.order.findMany()
        if(!all || all.length === 0){
            return res.status(400).json({message: "There is no orders.."})
        }
        res.status(200).json({message: "All Orders displayed successfully.", data: all})
    } catch (error) {
        res.status(500).json({message: "internal server error", error})
    }
}


// create order
export const neworder = async(req: Request , res: Response)=> {
    try {
        const {  orderNumber , supplierId ,status  ,totalAmount ,currency,notes, items } = req.body
        if(!orderNumber || !supplierId || !status || !totalAmount || !currency || !notes){
            return res.status(400).json({message: "Please enter a valid credentials"})
        }

        const check = await prisma.order.findFirst({
            where: {
                orderNumber
            }
        })
        if(check){
            return res.status(400).json({message: "This order is already registered", success: false})
        }

        const neworder = await prisma.order.create({
            data: {
                 orderNumber , supplierId ,status  ,totalAmount ,currency,notes,  items: items ?? [] 
            }
        })
        res.status(200).json({message: "New order is registered successfully", data: neworder, success: true})
    } catch (error) {
        res.status(500).json({message: "internal server error", error})
    }
}


// update order
export const updateorder = async( req: Request , res: Response)=> {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "Please Provide valid crendentials"})
        }
        const {  orderNumber , supplierId ,status  ,totalAmount ,currency,notes, items } = req.body
        if(!orderNumber || !supplierId || !status || !totalAmount || !currency || !notes){
            return res.status(400).json({message: "Please provide vlaid credentials"})
        }

        const check = await prisma.order.findFirst({
            where:{
                id: +id
            }
        })
        if(!check){
            return res.status(400).json({message: "This order is not found"})
        }

        const updatingorder = await prisma.order.update({
            where : {
                id : +id
            },
            data: {
                    orderNumber , supplierId ,status  ,totalAmount ,currency,notes,  items: items ?? [] 
            }
        })
          res.status(200).json({message: "This order is updating successfully", data: updatingorder, success: true})
    } catch (error) {
        res.status(500).json({message: "internal server error", error})
    }
}


// deleting order
export const deleteorder = async( req: Request , res: Response)=> {
    try {
        const { id} = req.params
        if(!id){
            return res.status(400).json({message: "Please provide valid ID"})
        }

        const check = await prisma.order.findFirst({
            where: {
                id : +id
            }
        })
        if(!check){
            return res.status(400).json({message: "This order it doesnot exist"})
        }

        const deletingorder = await prisma.order.delete({
            where: {
                id : +id
            }
        })
        res.status(200).json({message: "This order is deleting successfully", data: deletingorder, success: true})
    } catch (error) {
        res.status(500).json({message : "internal server error", error})
    }
}


// get one order
export const getone = async( req: Request , res: Response)=> {
try {
    const {id} = req.params
    if(!id){
        return res.status(400).json({message: "Please provide valid ID"})
    }

    const check = await prisma.order.findFirst({
        where : {
 id: +id
        }
       
    })
    if(!check){
        return res.status(400).json({message: "This order is not found"})
    }
    res.status(200).json({message: "One order is displayed successfully", data: check , success:  true})
} catch (error) {
    res.status(500).json({message: "internal server error", error})
}
}


// remove
export const removeorder = async( req: Request , res: Response)=> {
     try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "PLease Provide valid ID"})
        }

        const check = await prisma.order.findFirst({
            where: {
                id: +id
            }
        })

        if(check?.is_deleted === true){
            return res.status(400).json({message: "This Order is removed successfully"})
        }

        if(!check){
            return res.status(400).json({message: "This order is not found"})
        }

        const removingorder = await prisma.order.update({
            where: {
                id:+id
            },
            data: {
                is_deleted : true
            }
        })
        res.status(200).json({message: "This order is removed successfully", data: removingorder})
     } catch (error) {
        res.status(500).json({message: "internal server error", error})
     }
}

// restore order
export const restoreorder = async(req: Request , res: Response)=> {
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message: "pLease provide valid ID"})
        }
      const check = await prisma.order.findFirst({
        where : {
            id : +id
        }
      })

      if(check?.is_deleted === false){
        return res.status(400).json({message : "This order is already restored before"})
      }

      if(!check){
        return res.status(400).json({message: "This order is not found"})
      }

      const restoringorder = await prisma.order.update({
        where : {
            id : +id
        },
        data: {
            is_deleted : false
        }
      })
      res.status(200).json({message: "This order is restored successfully", data: restoringorder, success: true})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
    }
}

// trash
export const trashorder = async(req: Request , res: Response)=> {
    try {
        const all = await prisma.order.findMany({
            where: {
                is_deleted: true
            }
        })
        if(!all || all.length === 0){
            return res.status(400).json({message: "There is no trash orders at this moment"})
        }
        res.status(200).json({mesage: "All trash orders are displayed successfully", data: all, success: true})
    } catch (error) {
        res.status(500).json({mesage: "internal server error", error})
    }
}