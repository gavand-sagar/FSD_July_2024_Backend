import { Router } from "express";

export const arrayRoutes = Router();

let array = ["apple"];

arrayRoutes.get("/get-items", (req, res) => {
    res.json(array)
});

// delete last 
arrayRoutes.get("/delete-last", (req, res) => {
    array.pop()
    res.json(array)
});

// insert new 
arrayRoutes.get("/insert-new/:whatever", (req, res) => {
    array.push(req.params.whatever)
    res.json(array)
});