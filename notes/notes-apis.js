import { Router } from "express"
import { body, validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken'
import { getDb } from "../db/db-utils.js";
export const notesApis = Router();

notesApis.get("/get-notes-list", async (req, res) => {
    const db = await getDb();
    const userObj = jwt.decode(req.headers.token)
    const notes = await db.collection('notes').find({
        userId: new ObjectId((userObj.userId + ''))
    }).toArray();
    return res.json(notes)
})

notesApis.get("/get-note/:id", async (req, res) => {
    // we want to get the list from the database    
    const db = await getDb();
    const userObj = jwt.decode(req.headers.token)
    const singleNote = await db.collection('notes').findOne({
        _id: new ObjectId(req.params.id),
        userId: new ObjectId((userObj.userId + ''))
    })
    if (!singleNote) {
        return res.status(401).json({ messages: "Note does not belongs to the user." })
    }
    return res.json(singleNote)
})

notesApis.delete("/delete-note/:id", async (req, res) => {
    // we want to get the list from the database
    const db = await getDb();
    const userObj = jwt.decode(req.headers.token)
    const dbResponse = await db.collection('notes').deleteOne({
        _id: new ObjectId(req.params.id),
        userId: new ObjectId((userObj.userId + ''))
    })
    if (dbResponse.deletedCount == 0) {
        return res.status(401).json({ messages: "Note does not belongs to the user." })
    }
    return res.json(dbResponse)
})

notesApis.post("/create-note",
    body("noteText")
        .isString()
        .withMessage("Should be string")
        .notEmpty()
        .withMessage("Required")
        .isLength({
            min: 5, max: 500
        })
        .withMessage("Username should be 5-500 letters long")
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ errors: errors.array() })
            return;
        }

        const userObj = jwt.decode(req.headers.token)
        const noteObj = {
            noteText: req.body.noteText,
            userId: new ObjectId((userObj.userId + '')),
            createdAt: new Date()
        }

        const db = await getDb();
        const dbResponse = await db.collection("notes").insertOne(noteObj)
        return res.json({ messages: "Note Added Successfully.", dbResponse })
    })

