import { Router } from "express";

export const objRoutes = Router();

let obj = {
    count1: 0,
    count2: 0,
    count3: 0
}

// retutn whole object
objRoutes.get("/get-obj", (req, res) => {
    res.json(obj)
});


// changes count1
objRoutes.get("/change-count1", (req, res) => {
    obj.count1 = obj.count1 + 1
    res.json(obj)
});

// changes count2
objRoutes.get("/change-count2", (req, res) => {
    obj.count2 = obj.count2 + 1
    res.json(obj)
});

// changes count3
app.get("/change-count3", (req, res) => {
    obj.count3 = obj.count3 + 1
    res.json(obj)
});

