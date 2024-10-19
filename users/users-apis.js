import { Router } from "express"

export const userApis = Router();

userApis.get("/get-user-profile", (req, res) => {
    res.json({
        username: "sagar",
        email: "sagar@sagar.cc",
    })
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

