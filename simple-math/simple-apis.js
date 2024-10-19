import { Router } from "express";

export const simpleMathRoutes = Router();

//  /get-square/5  -> 25
//  /get-square/8  -> 64
simpleMathRoutes.get("/get-square/:whatever", (req, res) => {
    res.json({
        ans: req.params.whatever * req.params.whatever
    })
});


//  /get-square?value=5
simpleMathRoutes.get("/get-square", (req, res) => {
    res.json({
        ans: req.query.value * req.query.value
    })
});





simpleMathRoutes.get("/get-area/:height/:width", (req, res) => {
    res.json({
        area: req.params.height * req.params.width
    })
});



//get-area?height=66996&width=3932
simpleMathRoutes.get("/get-area", (req, res) => {
    res.json({
        area: req.query.height * req.query.width
    })
});


// simple interest
// si = p * n * r / 100
// /simple-interest/10000/5/10 --> 50000
simpleMathRoutes.get("/simple-interest/:p/:n/:r", (req, res) => {
    res.json({
        interest: req.params.p * req.params.n * req.params.r / 100
    })
});

///simple-interest?p=2121&n=3636&r=33
simpleMathRoutes.get("/simple-interest/:p/:n/:r", (req, res) => {
    res.json({
        interest: req.query.p * req.query.n * req.query.r / 100
    })
});

