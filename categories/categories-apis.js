import { Router } from "express"
import { body, validationResult } from "express-validator";
import { MongoClient, ObjectId } from "mongodb";
import { DbConnectionString } from "../constant.js";
export const categoriesApis = Router();


categoriesApis.get("/get-all-categories", async (req, res) => {




    const client = new MongoClient(DbConnectionString)
    const connection = await client.connect();
    const db = connection.db("icc");

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
            const client = new MongoClient(DbConnectionString)
            const connection = await client.connect();
            const db = connection.db("icc");

            const dbResponse = await db.collection("categories").insertOne(req.body)
            res.json({ message: "Created.", dbResponse })
        } else {
            res.json({ errors: errors.array() })
        }
    })