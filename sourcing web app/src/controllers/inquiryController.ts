import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { customUserRequest } from "../utils/jwt";

const prisma = new PrismaClient();

// Get All inquiries
export const getAllinquiries = asyncHandler (async ( req : Request , res : Response) => {
  try {
    const all = await prisma.inquiry.findMany({})
    if(!all || all.length === 0){
      res.status(400).json({
        success : false,
        message : ' There is no inquiry at this moment'
      })
      return 
    }
    res.status(201).json({
      success : true,
      message : ' All inquiry Displayed Successfully',
      result : all
    })
  } catch (error) {
    res.status(400).json({
      message : 'Internal Server Error'
    })
  }
})

// Create inquiries
export const creatinginquiries = asyncHandler(async ( req : Request, res : Response) => {
  try {
    const user = req.body;

    const {  message, quantity, productId, email } = req.body;

    if ( !message || !quantity || !productId || !email) {
      return res.status(400).json({
        success: false,
        message: "subject and message are required"
      });
    }

    if (productId) {
      const product = await prisma.inquiry.findUnique({
        where: { id: Number(productId) }
      });

      if (product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
    }

    if(!user){
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const newInquiry = await prisma.inquiry.create({
      data: {
         message, quantity, productId, email
      }
    });

    res.status(201).json({
      success: true,
      message: "Inquiry created successfully",
      data: newInquiry
    });

  } catch (error) {
    res.status(500).json({
      success : false,
      message : ' Internal Server Error'
    })
  }
})

// Updating inquiries
export const updatinginquiry = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log('📝 Update ID:', id)
        console.log('📝 Body:', req.body)
        
        if (!id) {
            return res.status(400).json({ success: false, message: 'Provide Valid inquiry Id' })
        }

        const { message, quantity, productId, email, status } = req.body

        // ✅ Status kaliya
        if (status && !message && !quantity && !productId && !email) {
            console.log('📝 Updating status:', status)
            
            const updateinquiry = await prisma.inquiry.update({
                where: { id: +id },
                data: { status }
            })
            
            console.log('✅ Done:', updateinquiry)
            
            return res.status(200).json({
                success: true,
                message: 'Inquiry status updated successfully',
                data: updateinquiry
            })
        }

        // ✅ Dhammaan fields
        if (!message || !quantity || !productId || !email) {
            return res.status(400).json({ success: false, message: 'Provide Valid inquiry Credentails' })
        }

        // ✅ FIX: Ku dar 'await'
        const check = await prisma.inquiry.findFirst({
            where: { id: +id }
        })
        
        if (!check) {
            return res.status(400).json({ success: false, message: 'This inquiry is not found' })
        }

        const updateinquiry = await prisma.inquiry.update({
            where: { id: +id },
            data: {
                message,
                quantity: +quantity,
                productId: +productId,
                email,
                status: status || undefined
            }
        })
        
        console.log('✅ Updated:', updateinquiry)
        
        res.status(200).json({
            success: true,
            message: 'This inquiry Updated Successfully',
            data: updateinquiry
        })
    } catch (error: any) {
        console.error('❌ ERROR:', error.message)
        console.error('❌ CODE:', error.code)
        console.error('❌ META:', error.meta)
        res.status(500).json({ success: false, message: 'Internal Server error' })
    }
})

// Deleting inquiry
export const deletinginquiry = asyncHandler(async ( req : Request , res : Response) => {
  try {
    const { id } = req.params
    if(!id){
      res.status(400).json({
        success : false,
        message : 'Provide Valid inquiry Id'
      })
      return 
    }
    const check = await prisma.inquiry.findFirst({
      where : {
        id : +id
      }
    })
    if(!check){
      res.status(400).json({
        success : false,
        message : ' This inquiry Does Not Exits It'
      })
      return 
    }

    const deletinginquiry = await prisma.inquiry.delete({
      where : {
        id : +id
      }
    })
    res.status(200).json({
      success : true,
      message : 'This inquiry Deleted Successfully',
      data: deletinginquiry

    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : ' Internal Server Error '
    })
  }
})

// Get One inquiry
export const getOneinquiry = asyncHandler(async ( req : Request , res : Response) => {
  try {
    const { id } = req.params
    if(!id){
      return res.status(400).json({
        message : ' Provide inquiry Id'
      })
    }

    const checkinquiry = await prisma.inquiry.findFirst({
      where : {
        id : +id
      }
    })

    if(!checkinquiry){
      res.status(400).json({
        message : ' This inquiry is not found'
      })
      return
    }

    res.status(201).json({
      message : ' One inquiry is  displayed successfully',
      result : checkinquiry
    })
  } catch (error) {
    res.status(500).json({
      message : ' Internal Server error'
    })
  }
})

// Removed inquiry
export const removinginquiry = asyncHandler(async(req : Request , res : Response) => {
  try {
    const { id } = req.params
    
    const check = await prisma.inquiry.findFirst({
      where : {
        id : +id!
      } 
    })
    if(check?.is_deleted === true){
     res.status(400).json({
       message : "This inquiry is already removed"
     })
     return
    }
    if(!check){
      res.status(400).json({
        isSuccess : false,
        message : ' This inquiry is not found'
      })
      return
    }
    const inquiryremove = await prisma.inquiry.update({
      where : {
        id : +id!
      },
      data : {
        is_deleted : true
      }
    })
    res.status(200).json({
      message : 'Inquiry removed successfully', data: inquiryremove
    })
  } catch (error) {
    res.status(500).json({
      message : ' Internal Server error'
    })
  }
})

// Restoring inquiry
export const restoringinquiry = asyncHandler(async(req : Request , res : Response) => {
  try {
    const { id } = req.params
    
    const check = await prisma.inquiry.findFirst({
      where : {
        id : +id!
      } 
    })
    if(check?.is_deleted === false){
     res.status(400).json({
       message : "This inquiry is already restored"
     })
     return
    }
    if(!check){
      res.status(400).json({
        isSuccess : false,
        message : ' This inquiry is not found'
      })
      return
    }
    const inquiryrestoring = await prisma.inquiry.update({
      where : {
        id : +id!
      },
      data : {
        is_deleted : false
      }
    })
    res.status(200).json({
      message : 'Inquiry Restored successfully', data: inquiryrestoring
    })
  } catch (error) {
    res.status(500).json({
      message : ' Internal Server error'
    })
  }
})

// Trash 
export const trashinquiry = asyncHandler( async ( req : Request , res : Response) => {
  try {
    const all = await prisma.inquiry.findMany({
      where : {
        is_deleted : true,
      }
    })
    if(!all || all.length === 0){
      res.status(400).json({
        success : false,
        message : ' There is no trash inquiries at this moment'
      })
      return 
    }
    res.status(201).json({
      success : true,
      message : ' All Trash Inquiries Displayed Successfully',
      result : all
    })
  } catch (error) {
    res.status(400).json({
      message : 'Internal Server Error'
    })
  }
})