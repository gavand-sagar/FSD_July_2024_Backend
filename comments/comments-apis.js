import { Router } from "express";

export const commentApis = Router();


commentApis.get("/get-comments",(req,res)=>{
    res.json({
        comments:[]
    })
})


commentApis.get("/like-comment",(req,res)=>{
    res.json({
        comments:[]
    })
})

commentApis.get("/unlike-comment",(req,res)=>{
    res.json({
        comments:[]
    })
})