import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();



// Get All categories
export const getAllcategory = async ( req : Request, res : Response) => {
  try {
    const all = await prisma.category.findMany({})
    if(!all || all.length === 0){
      res.status(400).json({
        success : false,
        message : ' There is no category at this moment'
      })
      return 
    }
    res.status(201).json({
      success : true,
      message : ' All category Displayed Successfully',
      result : all
    })
  } catch (error) {
    res.status(400).json({
      message : 'Internal Server Error'
    })
  }
}

// Create categories
export const creatingcategory = async ( req : Request, res : Response) => {
 
  try {
    const {name  ,slug ,  description} = req.body

    if(!name || !slug || !description  ) {
      res.status(400).json({
        success : false,
        message : ' Provide Valid category Credentialss'
      })
      return 
    }

   

    const checkingcategory = await prisma.category.findFirst({
      where : {
        slug
      }
    })
    if(checkingcategory){
      res.status(400).json({
        success : false,
        message : ' This category already registered please check up the name '
      })
      return 
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

    const newcategory = await prisma.category.create({
      data : {
       name  ,slug ,  description,  images: uploadedImages,
      }
    })

    res.status(200).json({
      success : true,
      message : ' New category Registered Successfully',
      data : newcategory
    })

  } catch (error) {
     console.error('❌ Category Create Error:', error); 
    res.status(500).json({
      success : false,
      message : ' Internal Server Error'
    })
  }
}

// Updating suppliersFor Using Thier With Params 
export const updatingcategory = async ( req : Request , res : Response) => {
  try {
    const { id } = req.params
    if(!id){
      res.status(400).json({
        succes : false,
        message : 'Provide Valid category Id To Update It'
      })
      return 
    }

    const { name  ,slug ,  description}  = req.body
      const image = req.file
      // 👇 Line-kan la'aantiis ayaa error-ka keenay
    const imagePath = image ? `/uploads/${image.filename}` : null;
    
    if(!name || !slug || !description  ){
      res.status(400).json({
        success : false,
        message : 'Provide Valid category Credentailsss'
      })
      return 
    }

    const check = prisma.category.findFirst({
      where : {
        id : +id
      }
    })
    if(!check) {
      res.status(400).json({
        success : false,
        message : 'This category is not found in the database '
      })
      return 
    }

 const updateData: any = { name, slug, description };
    if (imagePath) {
      updateData.image = imagePath;  // Ku dar image kaliya haddii cusub la soo geliyo
    }

    const updatecategory = await prisma.category.update({
      where : {
        id : +id
      },
      data : updateData
    })
    res.status(200).json({
      succees : true,
      message : 'This category Updated Successfully',
      data : updatecategory
    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : 'Internal Server error'
    })
  }
}


// Deleting Students With Thier Id Params 
export const deletingcategory = async ( req : Request , res : Response) => {
  try {
    const { id } = req.params
    if(!id){
      res.status(400).json({
        success : false,
        message : 'Provide Valid category Id'
      })
      return 
    }
    const check = prisma.category.findFirst({
      where : {
        id : +id
      }
    })
    if(!check){
      res.status(400).json({
        success : false,
        message : ' This category Does Not Exits It'
      })
      return 
    }

    const deletingcategory = await prisma.category.delete({
      where : {
        id : +id
      }
    })
    res.status(200).json({
      success : true,
      message : 'This category Deleted Successfully',
      data: deletingcategory

    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : ' Internal Server Error '
    })
  }
}


// Get One supplier Id Params 
export const getOnecategory = async ( req : Request , res : Response) => {
  try {
    const { id } = req.params
    if(!id){
      return res.status(400).json({
        message : ' Provide category Id'
      })
    }

    const checkcategory = await prisma.category.findFirst({
      where : {
        id : +id
      }
    })

    if(!checkcategory){
      res.status(400).json({
        message : ' This category is not found'
      })
      return
    }

    res.status(201).json({
      message : ' One category is  displayed successfully',
      result : checkcategory
    })
  } catch (error) {
    res.status(500).json({
      message : ' Internal Server error'
    })
  }
}


// Removed Supplier 
export const removingcategory = async(req : Request , res : Response) => {
  try {
    const { id } = req.params
    
    const check = await prisma.category.findFirst({
      where : {
        id : +id!
      } 
    })
    if(check?.is_deleted === true){
     res.status(400).json({
       message : "This Student is already removed"
     })
     return
    }
    if(!check){
      res.status(400).json({
        isSuccess : false,
        message : ' This student is not found'
      })
      return
    }
    const removingcategory = await prisma.category.update({
      where : {
        id : +id!
      },
      data : {
        is_deleted : true
      }
    })
    res.status(200).json({
      message : 'Category removed successfully' , data: removingcategory
    })
  } catch (error) {
    res.status(500).json({
      message : ' Internal Server error'
    })
  }
}

// Restoring Category 
export const restoringCategory = async(req : Request , res : Response) => {
  try {
    const { id } = req.params
    
    const check = await prisma.category.findFirst({
      where : {
        id : +id!
      } 
    })
    if(check?.is_deleted === false){
     res.status(400).json({
       message : "This Category is already restored"
     })
     return
    }
    if(!check){
      res.status(400).json({
        isSuccess : false,
        message : ' This student is not found'
      })
      return
    }
    const restoringCategory = await prisma.category.update({
      where : {
        id : +id!
      },
      data : {
        is_deleted : false
      }
    })
    res.status(200).json({
      message : 'Category Restored successfully' , data: restoringCategory
    })
  } catch (error) {
    res.status(500).json({
      message : ' Internal Server error'
    })
  }
}

// Trash 
export const trashCategory = async ( req : Request , res : Response) => {
  try {
    const all = await prisma.category.findMany({
      where : {
        is_deleted : true,
      }
    })
    if(!all || all.length === 0){
      res.status(400).json({
        success : false,
        message : ' There is no trash categories at this moment'
      })
      return 
    }
    res.status(201).json({
      success : true,
      message : ' All Trash Categories Displayed Successfully',
      result : all
    })
  } catch (error) {
    res.status(400).json({
      message : 'Internal Server Error'
    })
  }
}