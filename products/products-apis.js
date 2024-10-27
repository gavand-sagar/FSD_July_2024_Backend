import { Router } from "express"
import { body, validationResult } from "express-validator";
import { MongoClient, ObjectId } from "mongodb";
import { DbConnectionString } from "../constant.js";
export const productApis = Router();


productApis.get("/get-all-products", async (req, res) => {
    // we want to get the list from the database
    const client = new MongoClient(DbConnectionString)
    const connection = await client.connect();
    const db = connection.db("icc");

    if (req.query.priceGreaterThan) {
        const data = await db.collection("products").find({ price: { $gt: Number(req.query.priceGreaterThan) } }).toArray();
        res.json(data);
    } else {
        const data = await db.collection("products").find({}).toArray();
        res.json(data);
    }

})

// Try to create following apis (you can refer user's apis)
productApis.delete("/delete-product/:id", async (req, res) => {
    const client = new MongoClient(DbConnectionString)
    const connection = await client.connect();
    const db = connection.db("icc");

    const data = await db.collection("products").deleteMany({ _id: new ObjectId(req.params.id) });
    res.json(data);
})


productApis.patch("/update-product/:id", async (req, res) => {
    const client = new MongoClient(DbConnectionString)
    const connection = await client.connect();
    const db = connection.db("icc");

    const matcher = { _id: new ObjectId(req.params.id) };
    const updateQuery = {
        $set: req.body
    }

    const dbResponse = await db.collection("products").updateOne(matcher, updateQuery);
    res.json(dbResponse);
})


productApis.post("/insert-product",
    body("title")
        .isString().withMessage("should be string")
        .notEmpty().withMessage("Required")
        .isLength({ min: 5, max: 100 }).withMessage("length 5-100")
    ,
    body("category")
        .isString().withMessage("should be string")
        .notEmpty().withMessage("Required")
        .isLength({ min: 5, max: 100 }).withMessage("length 5-100")
    ,
    body("price")
        .isNumeric().withMessage("should be number")
        .notEmpty().withMessage("Required")
        .isFloat({ min: 0 }).withMessage("can not be negetive")
    ,
    body("rating")
        .isNumeric().withMessage("should be number")
        .notEmpty().withMessage("Required")
        .isFloat({ min: 0, max: 5 }).withMessage("must be between 0-5")
    , body("stock")
        .isNumeric().withMessage("should be number")
        .notEmpty().withMessage("Required")
        .isInt({ min: 0 }).withMessage("can not be negetive")

    ,
    async (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {
            const client = new MongoClient(DbConnectionString)
            const connection = await client.connect();
            const db = connection.db("icc");

            const dbResponse = await db.collection("products").insertOne(req.body)
            res.json({ message: "Created.", dbResponse })
        } else {
            res.status(400).json(errors.array())
        }
    })