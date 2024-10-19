import { Router } from "express"

export const userApis = Router();

const usersArray = []

userApis.get("/get-users-list", (req, res) => {
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
    res.json(req.body)
})


