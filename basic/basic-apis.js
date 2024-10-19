import { Router } from "express"

export const basicRoutes = Router(); 

// endpoint / api
basicRoutes.get("/", (req, res) => { 
    res.send("<h1>Hi this is Sagar</h1>")
})


// endpoint / api
basicRoutes.get("/hi", (req, res) => {
    res.send("<h1>Hello</h1>")
})


// enpoint / api
basicRoutes.get("/how-are-you", (req, res) => {
    res.send("<h1>Fine</h1>")
})


// enpoint / api
basicRoutes.get("/fact", (req, res) => {

    //text response
    res.send(`{
  "fact": "A cat named Dusty, aged 1 7, living in Bonham, Texas, USA, gave birth to her 420th kitten on June 23, 1952.",
  "length": 107
}`)
})

// enpoint / api
basicRoutes.get("/fact-v2", (req, res) => {

    //json response
    res.json({
        "fact": "A cat named Dusty, aged 1 7, living in Bonham, Texas, USA, gave birth to her 420th kitten on June 23, 1952.",
        "length": 107
    })
})