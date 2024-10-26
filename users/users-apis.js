import { Router } from "express"
import { MongoClient, ObjectId } from "mongodb";
export const userApis = Router();


userApis.get("/get-users-list", async (req, res) => {
    // we want to get the list from the database
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
    const connection = await client.connect();
    const db = connection.db("icc");

    const data = await db.collection("users").find({ username: req.query.username, password: req.query.password }).toArray();
    res.json(data);
})

userApis.get("/get-user/:id", async (req, res) => {
    // we want to get the list from the database
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
    const connection = await client.connect();
    const db = connection.db("icc");

    const [data] = await db.collection("users").find({ _id: new ObjectId(req.params.id) }).toArray();
    res.json(data);
})

userApis.patch("/update-user/:id", async (req, res) => {
    // we want to get the list from the database
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
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
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
    const connection = await client.connect();
    const db = connection.db("icc");

    const data = await db.collection("users").deleteMany({ _id: new ObjectId(req.params.id) });
    res.json(data);
})

userApis.post("/signup-user", async (req, res) => {
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
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
})


userApis.get("/get-all-products", async (req, res) => {
    // we want to get the list from the database
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
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
