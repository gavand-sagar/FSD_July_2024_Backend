import { Router } from "express"
import fs from 'fs'
export const userApis = Router();


userApis.get("/get-users-list", (req, res) => {
    const usersArray = JSON.parse(fs.readFileSync("./data.json"))
    res.json(usersArray)
})


userApis.get("/check-username-exists", (req, res) => {
    res.json({
        exists: false
    })
})


userApis.get("/get-user-email", (req, res) => {
    res.json({
        email: "Sagar@asddf.cc"
    })
})


userApis.post("/signup-user", (req, res) => {
    
    const usersArray = JSON.parse(fs.readFileSync("./data.json"))
    usersArray.push(req.body);
    fs.writeFileSync("./data.json",  JSON.stringify(usersArray) )

    res.json({
        message:"Created"
    })
})


