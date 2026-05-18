import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt'
import { generateToken } from "../utils/jwt";


// Get All Users 
export const getAllUsers = async ( req : Request , res : Response) => {
    try {
        const all_users = await prisma.user.findMany();
        if(!all_users){
            res.status(400).json({
                message : "There is no users"
            })
            return
        }
        res.status(200).json({
            message : ' All Users displayed successfully',
            data : all_users
        })
    } catch (error) {
        res.status(500).json({
            message : ' Internal Server error '
        })
    }
}


// Creating User 
export const creatingUser = async ( req : Request , res : Response) => {
    try {
        const { name , email , phone , password } = req.body
        if(!name || !email || !password || !phone ){
            res.status(400).json({
                message : ' Provide Valid User Credentials'
            })
            return
        }


        // Checking If user already existed 
        const check = await prisma.user.findFirst({
            where : {
                name,
                email
            },
        })

      

        if(check){
            res.status(400).json({
                message : ' This email or name already taken'
            })
            return
        }

        const hashedPassword = bcrypt.hashSync(password , 10)

        const new_user = await prisma.user.create({
            data : {
                name,
                email,
                phone,
                password: hashedPassword,
                role : (email === "yaanbo306@gmail.com" ? "admin" : "buyer") 
            }
        })
        res.status(201).json({
            message : 'New User Registered Successfully',
            data : new_user
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message : ' Internal Server error'
        })
    }
}






// Login User
export const loginUser = async ( req : Request , res : Response) => {
    try {
        const { email , password} = req.body
        if(!email || !password) {
            res.status(400).json({
                message : ' Provide Valid Login Credentials'
            })
            return 
        }

        const check = await prisma.user.findFirst({
            where : {
                email
            },
            select : {
                id : true,
                name : true,
                email : true,
                password : true,
                phone : true,
                role : true
            }
        })
        if(!check){
            res.status(400).json({
                message : ' This email is not found'
            })
            return
        }

        const checkPassword = bcrypt.compareSync(password , check.password)
        if(!checkPassword){
            res.status(400).json({
                message : ' Invalid Password'
            })
            return 
        }

        const result = generateToken({
            name: check.name,
            id : check.id,
            email : check.email,
            phone: check.phone,
            role : check.role
        })

        res.status(201).json({
            message : ' User Logged Successfully',
            token : result
        })
    } catch (error) {
        res.status(500).json({
            message : 'Internal Server error '
        })
    }
}