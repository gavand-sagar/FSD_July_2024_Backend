import { Router } from "express"
import { body, validationResult } from "express-validator";
import { getDb } from "../db/db-utils.js";
export const categoriesApis = Router();


categoriesApis.get("/get-all-categories", async (req, res) => {
    const db = await getDb();
    const data = await db.collection("categories").find({}).toArray();
    res.json(data)  
})


categoriesApis.post("/insert-category",
    body('categoryName')
        .isString()
        .withMessage("Must be string")
        .isLength({ min: 3, max: 50 })
        .withMessage("Must be 3-50 letters long")
        .notEmpty()
        .withMessage("Required"),
    async (req, res) => {
        const errors = validationResult(req);     

        if (errors.isEmpty()) { // if there are no error in the data (data is in proper format)
           
            const db = await getDb();

            const alreadyPresent = await db.collection("categories")
            .findOne({
                categoryName: {
                    $regex: req.body.categoryName,
                    $options: 'i' // case insensitive search ie. "sagar" == "Sagar"
                }
            });
            if(alreadyPresent){
                res.status(400).json({ message: "CategoryName is already added." })
                return;
            }

            const dbResponse = await db.collection("categories").insertOne(req.body)
            res.json({ message: "Created.", dbResponse })
        } else {
            res.json({ errors: errors.array() })
        }
    })