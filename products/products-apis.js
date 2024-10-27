import { Router } from "express"
import { MongoClient, ObjectId } from "mongodb";
export const productApis = Router();


productApis.get("/get-all-products", async (req, res) => {
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

// Try to create following apis (you can refer user's apis)
productApis.delete("/delete-product/:id", async (req, res) => {
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
    const connection = await client.connect();
    const db = connection.db("icc");

    const data = await db.collection("products").deleteMany({ _id: new ObjectId(req.params.id) });
    res.json(data);
})


productApis.patch("/update-product/:id", async (req, res) => {
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
    const connection = await client.connect();
    const db = connection.db("icc");

    const matcher = { _id: new ObjectId(req.params.id) };
    const updateQuery = {
        $set: req.body
    }

    const dbResponse = await db.collection("products").updateOne(matcher, updateQuery);
    res.json(dbResponse);
})


productApis.post("/insert-product", async (req, res) => {
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
    const connection = await client.connect();
    const db = connection.db("icc");

    const dbResponse = await db.collection("products").insertOne(req.body)
    res.json({ message: "Created.", dbResponse })
})