import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();


export const updatingsetting = async ( req : Request , res : Response) => {
  try {
    const { id } = req.params
    if(!id){
      res.status(400).json({
        succes : false,
        message : 'Provide Valid user Id To Update It'
      })
      return 
    }

    const { email , password , name}  = req.body
  
    
    if(!email || !password || !name ){
      res.status(400).json({
        success : false,
        message : 'Provide Valid user Credentailsss'
      })
      return 
    }

    const check = prisma.setting.findFirst({
      where : {
        id : +id
      }
    })
    if(!check) {
      res.status(400).json({
        success : false,
        message : 'This user is not found in the database '
      })
      return 
    }



    const updateuser = await prisma.setting.update({
      where : {
        id : +id
      },
      data : {
        name , email, password
      }
    })
    res.status(200).json({
      succees : true,
      message : 'This user Updated Successfully',
      data : updateuser
    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : 'Internal Server error'
    })
  }
}
