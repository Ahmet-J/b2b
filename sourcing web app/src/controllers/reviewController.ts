import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
// import { customUserRequest } from "../helpers/jwt";
const prisma = new PrismaClient();



// Get All  review
export const getAllreview = asyncHandler(async (req: Request, res: Response) => {
  try {
    const all = await prisma.review.findMany({})
    if (!all || all.length === 0) {
      res.status(400).json({
        success: false,
        message: ' There is no review at this moment'
      })
      return
    }
    res.status(201).json({
      success: true,
      message: ' All reviews Displayed Successfully',
      result: all
    })
  } catch (error) {
    res.status(400).json({
      message: 'Internal Server Error'
    })
  }
})

// Create  review
export const creatingreview = asyncHandler(async (req: Request, res: Response) => {

  try {
    const { reviewname ,reviewerId ,revieweeId ,supplierId ,orderId    ,rating  ,comment     } = req.body
  if (!reviewerId || !revieweeId || !supplierId || !orderId || !rating  || !comment || !reviewname ) {
    res.status(400).json({
      success: false,
      message: ' Provide Valid  review Credentials'
    })
    return
  }

   const checkingproduct = await prisma.review.findFirst({
    where: {
     reviewname 
    }
  })
  if (checkingproduct) {
    res.status(400).json({
      success: false,
      message: ' This review already registered please check up the Stock Keeping Unit '
    })
    return
  }

  const neworder = await prisma.review.create({
    data: {
 reviewname ,   reviewerId  ,revieweeId , supplierId , orderId  ,rating   , comment
    }
  })

  res.status(200).json({
    success: true,
    message: ' New review is  Registered Successfully',
    data: neworder
  })

} catch (error) {
   console.log("❌ FULL ERROR:", error)
  res.status(500).json({
    success: false,
    message: ' Internal Server Error'
  })
}
})

// Updating review For Using Thier With Params 
export const updatingreview = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      res.status(400).json({
        succes: false,
        message: 'Provide Valid review Id To Update It'
      })
      return
    }

    const {  reviewname ,   reviewerId  ,revieweeId , supplierId , orderId  ,rating   , comment } = req.body
    if (!reviewerId || !revieweeId || !supplierId || !orderId || !rating  || !comment || !reviewname ) {
      res.status(400).json({
        success: false,
        message: 'Provide Valid review Credentails'
      })
      return
    }

    const check = prisma.review.findFirst({
      where: {
        id: +id
      }
    })
    if (!check) {
      res.status(400).json({
        success: false,
        message: 'This review is not found in the database '
      })
      return
    }

    const updateorderitem = await prisma.review.update({
      where: {
        id: +id
      },
      data: {
 reviewname ,   reviewerId  ,revieweeId , supplierId , orderId  ,rating   , comment
      }
    })
    res.status(200).json({
      succees: true,
      message: 'This review  Updated Successfully',
      data: updateorderitem
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server error'
    })
  }
})


// Deleting review  With Id Params 
export const deletingreview = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Provide Valid review Id'
      })
      return
    }
    const check = prisma.review.findFirst({
      where: {
        id: +id
      }
    })
    if (!check) {
      res.status(400).json({
        success: false,
        message: ' This review Does Not Exits It'
      })
      return
    }

    const deletingreview = await prisma.review.delete({
      where: {
        id: +id
      }
    })
    res.status(200).json({
      success: true,
      message: 'This review is Deleted Successfully',
      data: deletingreview

    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ' Internal Server Error '
    })
  }
})


// Get One  review with Id Params 
export const getOnereview = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({
        message: ' Provide valid review Id'
      })
    }

    const checkreview = await prisma.review.findFirst({
      where: {
        id: +id
      }
    })

    if (!checkreview) {
      res.status(400).json({
        message: ' This review is not found'
      })
      return
    }

    res.status(201).json({
      message: ' One review is  displayed successfully',
      result: checkreview
    })
  } catch (error) {
    res.status(500).json({
      message: ' Internal Server error'
    })
  }
})


// Removed review
export const removingreview = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const check = await prisma.review.findFirst({
      where: {
        id: +id!
      }
    })
    if (check?.is_deleted === true) {
      res.status(400).json({
        message: "This review is already removed"
      })
      return
    }
    if (!check) {
      res.status(400).json({
        isSuccess: false,
        message: ' This review is not found'
      })
      return
    }
    const quoteremove = await prisma.review.update({
      where: {
        id: +id!
      },
      data: {
        is_deleted: true
      }
    })
    res.status(200).json({
      message: 'review removed successfully', data: quoteremove
    })
  } catch (error) {
    res.status(500).json({
      message: ' Internal Server error'
    })
  }
})

// Restoring review
export const restoringreview = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const check = await prisma.review.findFirst({
      where: {
        id: +id!
      }
    })
    if (check?.is_deleted === false) {
      res.status(400).json({
        message: "This review is already restored"
      })
      return
    }
    if (!check) {
      res.status(400).json({
        isSuccess: false,
        message: ' This review is not found'
      })
      return
    }
    const quoterestoring = await prisma.review.update({
      where: {
        id: +id!
      },
      data: {
        is_deleted: false
      }
    })
    res.status(200).json({
      message: 'review Restored successfully', data: quoterestoring
    })
  } catch (error) {
    res.status(500).json({
      message: ' Internal Server error'
    })
  }
})

// Trash review
export const trashreview= asyncHandler(async (req: Request, res: Response) => {
  try {
    const all = await prisma.review.findMany({
      where: {
        is_deleted: true,
      }
    })
    if (!all || all.length === 0) {
      res.status(400).json({
        success: false,
        message: ' There is no trash review at this moment'
      })
      return
    }
    res.status(201).json({
      success: true,
      message: ' All Trash review Displayed Successfully',
      result: all
    })
  } catch (error) {
    res.status(400).json({
      message: 'Internal Server Error'
    })
  }
})