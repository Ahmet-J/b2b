import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Result } from "express-validator";
// import { customUserRequest } from "../helpers/jwt";
const prisma = new PrismaClient();



// Get All Suplliers 
export const getAllSuppliers = async ( req : Request , res : Response) => {
  try {
    const all = await prisma.supplier.findMany({})
    if(!all || all.length === 0){
      res.status(400).json({
        success : false,
        message : ' There is no suppliers at this moment'
      })
      return 
    }
    res.status(201).json({
      success : true,
      message : ' All Suppliers Displayed Successfully',
      result : all
    })
  } catch (error) {
    res.status(400).json({
      message : 'Internal Server Error'
    })
  }
}

// Create Suppliers
// ❌ KHALDAN - Haddii aad check-gareyso name laakiin name cusub waa jiraa:
export const createsupplier = async (req: Request, res: Response) => {
    try {
        const { name, Descriptionproduct, factorybackground, location, categortId } = req.body

        // ✅ Validation
        if (!name || !Descriptionproduct || !location || !categortId || !factorybackground || !location) {
            return res.status(400).json({ 
                message: "Missing required fields", 
                success: false 
            })
        }

        // ✅ Check if name exists - HALKAN AYAA DHIBAATADU KA JIRTA
        const existingSupplier = await prisma.supplier.findUnique({
            where: { name: name }  // ← @unique
        })

        if (existingSupplier) {
            // ❌ Haddii la helo name hore, diid
            return res.status(400).json({ 
                message: "This suppliers already registered please check up the name",
                success: false 
            })
        }

        // ✅ Create supplier
        const supplier = await prisma.supplier.create({
            data: {
                name,
                Descriptionproduct,
                factorybackground,
                location,
                categortId: parseInt(categortId)
            }
        })

        return res.status(201).json({
            message: "Supplier created successfully",
            data: supplier,
            success: true
        })

    } catch (error: any) {
        console.error('❌ Create Supplier Error:', error)
        
        // ✅ Handle unique constraint violation
        if (error.code === 'P2002') {
            return res.status(400).json({
                message: "This suppliers already registered please check up the name",
                success: false
            })
        }

        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

// Updating suppliersFor Using Thier With Params 
export const updatingSup = async ( req : Request , res : Response) => {
  try {
    const { id } = req.params
    if(!id){
      res.status(400).json({
        succes : false,
        message : 'Provide Valid Supplier Id To Update It'
      })
      return 
    }

    const {    name ,Descriptionproduct,factorybackground ,location,categortId}  = req.body
    if( !name || !Descriptionproduct || !factorybackground || !location || !categortId){
      res.status(400).json({
        success : false,
        message : 'Provide Valid Supplier Credentails'
      })
      return 
    }

    const check = prisma.supplier.findFirst({
      where : {
        id : +id
      }
    })
    if(!check) {
      res.status(400).json({
        success : false,
        message : 'This supplier is not found in the database '
      })
      return 
    }

    const update = await prisma.supplier.update({
      where : {
        id : +id
      },
      data : {
           name ,Descriptionproduct,factorybackground ,location,categortId
      }
    })
    res.status(200).json({
      succees : true,
      message : 'This supplier Updated Successfully',
      data : update
    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : 'Internal Server error'
    })
  }
}


// Deleting Students With Thier Id Params 
export const deletingSup = async ( req : Request , res : Response) => {
  try {
    const { id } = req.params
    if(!id){
      res.status(400).json({
        success : false,
        message : 'Provide Valid supplier Id'
      })
      return 
    }
    const check = prisma.supplier.findFirst({
      where : {
        id : +id
      }
    })
    if(!check){
      res.status(400).json({
        success : false,
        message : ' This Supplier Does Not Exits It'
      })
      return 
    }

    const deletingsup = await prisma.supplier.delete({
      where : {
        id : +id
      }
    })
    res.status(200).json({
      success : true,
      message : 'This supplier Deleted Successfully',
      data: deletingsup

    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : ' Internal Server Error '
    })
  }
}


// Get One supplier Id Params 
export const getOneSup = async ( req : Request , res : Response) => {
  try {
    const { id } = req.params
    if(!id){
      return res.status(400).json({
        message : ' Provide Supplier Id'
      })
    }

    const checkSup = await prisma.supplier.findFirst({
      where : {
        id : +id
      }
    })

    if(!checkSup){
      res.status(400).json({
        message : ' This supplier is not found'
      })
      return
    }

    res.status(201).json({
      message : ' One Supplier is  displayed successfully',
      result : checkSup
    })
  } catch (error) {
    res.status(500).json({
      message : ' Internal Server error'
    })
  }
}


// Removed Supplier 
export const removingSup = async(req : Request , res : Response) => {
  try {
    const { id } = req.params
    
    const check = await prisma.supplier.findFirst({
      where : {
        id : +id!
      } 
    })
    if(check?.is_deleted === true){
     res.status(400).json({
       message : "This Supplier is already removed"
     })
     return
    }
    if(!check){
      res.status(400).json({
        isSuccess : false,
        message : ' This supplier is not found'
      })
      return
    }
    const supplierrem = await prisma.supplier.update({
      where : {
        id : +id!
      },
      data : {
        is_deleted : true
      }
    })
    res.status(200).json({
      message : 'Supplier removed successfully', Result: supplierrem
    })
  } catch (error) {
    res.status(500).json({
      message : ' Internal Server error'
    })
  }
}

// Restoring Supplier 
export const restoringSupplier = async(req : Request , res : Response) => {
  try {
    const { id } = req.params
    
    const check = await prisma.supplier.findFirst({
      where : {
        id : +id!
      } 
    })
    if(check?.is_deleted === false){
     res.status(400).json({
       message : "This Supplier is already restored"
     })
     return
    }
    if(!check){
      res.status(400).json({
        isSuccess : false,
        message : ' This supplier is not found'
      })
      return
    }
    const supplierres = await prisma.supplier.update({
      where : {
        id : +id!
      },
      data : {
        is_deleted : false
      }
    })
    res.status(200).json({
      message : 'Supplier Restored successfully', Result: supplierres
    })
  } catch (error) {
    res.status(500).json({
      message : ' Internal Server error'
    })
  }
}

// Trash Supplier
export const trashSupplier = async ( req : Request , res : Response) => {
  try {
    const all = await prisma.supplier.findMany({
      where : {
        is_deleted : true,
      }
    })
    if(!all || all.length === 0){
      res.status(400).json({
        success : false,
        message : ' There is no trash suppliers at this moment'
      })
      return 
    }
    res.status(201).json({
      success : true,
      message : ' All Trash Suppliers Displayed Successfully',
      result : all
    })
  } catch (error) {
    res.status(400).json({
      message : 'Internal Server Error'
    })
  }
}