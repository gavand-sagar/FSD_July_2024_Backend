import { Router } from "express"
import { body, validationResult } from "express-validator";
import { MongoClient, ObjectId } from "mongodb";
import { DbConnectionString, SECRETE_KEY } from "../constant.js";
import jwt from 'jsonwebtoken'
export const userApis = Router();


userApis.get("/get-users-list", async (req, res) => {
    // we want to get the list from the database
    const client = new MongoClient(DbConnectionString)
    const connection = await client.connect();
    const db = connection.db("icc");

    if (req.query.username && req.query.password) {
        const data = await db.collection("users")
            .find({ username: req.query.username, password: req.query.password }).toArray();
        res.json(data);
    } else {
        const data = await db.collection("users")
            .find({}, {
                projection: {
                    password: false,
                }
            }).toArray();
        res.json(data);
    }

})

userApis.get("/get-user/:id", async (req, res) => {
    // we want to get the list from the database
    const client = new MongoClient(DbConnectionString)
    const connection = await client.connect();
    const db = connection.db("icc");

    const [data] = await db.collection("users").find({ _id: new ObjectId(req.params.id) }).toArray();
    res.json(data);
})

userApis.patch("/update-user/:id", async (req, res) => {
    // we want to get the list from the database
    const client = new MongoClient(DbConnectionString)
    const connection = await client.connect();
    const db = connection.db("icc");

    const matcher = { _id: new ObjectId(req.params.id) };
    const updateQuery = {
        $set: req.body
    }

    const dbResponse = await db.collection("users").updateOne(matcher, updateQuery)
    res.json(dbResponse);
})

userApis.delete("/delete-user/:id", async (req, res) => {
    // we want to get the list from the database
    const client = new MongoClient(DbConnectionString)
    const connection = await client.connect();
    const db = connection.db("icc");

    const data = await db.collection("users").deleteMany({ _id: new ObjectId(req.params.id) });
    res.json(data);
})

userApis.post("/signup-user",
    body("username")
        .isString()
        .withMessage("Should be string")
        .notEmpty()
        .withMessage("Required")
        .isLength({
            min: 5, max: 50
        })
        .withMessage("Username should be 5-50 letters long")
    ,
    body("password")
        .isString()
        .withMessage("Should be string")
        .notEmpty()
        .withMessage("Required")
        .isLength({
            min: 8, max: 100
        })
        .withMessage("password should be 8-100 letters long"),
    body("email")
        .isString()
        .withMessage("Should be string")
        .notEmpty()
        .withMessage("Required")
        .isEmail()
        .withMessage("Email should be in proper format")
    , async (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const client = new MongoClient(DbConnectionString)
            const connection = await client.connect();
            const db = connection.db("icc");
            // check if user already exists
            const data = await db.collection("users")
                .find({
                    username: {
                        $regex: req.body.username,
                        $options: 'i' // case insensitive search ie. "sagar" == "Sagar"
                    }
                }).toArray();

            if (data.length > 0) { // username present
                res.status(400).json({ message: "Username is already taken." })
            } else {
                const dbResponse = await db.collection("users").insertOne(req.body)
                res.json({ message: "Created.", dbResponse })
            }
        } else {
            res.status(400).json({ errors: errors.array() })
        }

    })



userApis.get('/generate-token', async (req, res) => {
    const client = new MongoClient(DbConnectionString)
    const connection = await client.connect();
    const db = connection.db("icc");

    const user = await db.collection("users")
        .findOne({ username: req.headers.myusername, password: req.headers.mypassword });
    //if user present in the db then read categories from db and send otherwise send error response
    if (user) {
        const token = jwt.sign({
            username: user.username
        },
            SECRETE_KEY,
            {
                expiresIn: "2h"
            }
        )
        //generate the token and send it to client
        res.json({ token })
    } else {
        res.status(401).json({ message: "Un authorized." })
        return;
    }

})