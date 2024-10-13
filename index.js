import express from 'express'

const app = express();





let count = 0;

app.get("/get-value", (req, res) => {
    res.json({
        count: count
    })
})
app.get("/increment", (req, res) => {
    count = count + 1;
    res.json({
        count: count
    })
})

app.get("/decrement", (req, res) => {
    count = count - 1;
    res.json({
        count: count
    })
});



let obj = {
    count1:0,
    count2:0,
    count3:0
}

// retutn whole object
app.get("/get-obj", (req, res) => {
    res.json(obj)
});


// changes count1
app.get("/change-count1", (req, res) => {
    obj.count1 = obj.count1 + 1
    res.json(obj)
});

// changes count2
app.get("/change-count2", (req, res) => {
    obj.count2 = obj.count2 + 1
    res.json(obj)
});


// changes count3
app.get("/change-count3", (req, res) => {
    obj.count3 = obj.count3 + 1
    res.json(obj)
});



let array = ["apple"];

app.get("/get-items", (req, res) => {
    res.json(array)
});

// delete last 
app.get("/delete-last", (req, res) => {
    array.pop()
    res.json(array)
});

// insert new 
app.get("/insert-new/:whatever", (req, res) => {
    array.push(req.params.whatever)
    res.json(array)
});


//  /get-square/5  -> 25
//  /get-square/8  -> 64
app.get("/get-square/:whatever", (req, res) => {
    res.json({
        ans : req.params.whatever * req.params.whatever
    })
});



app.get("/get-square", (req, res) => {
    res.json({
        ans : req.query.value * req.query.value
    })
});





app.get("/get-area/:height/:width", (req, res) => {
    res.json({
        area : req.params.height * req.params.width
    })
});



//get-area?height=66996&width=3932
app.get("/get-area", (req, res) => {
    res.json({
        area : req.query.height * req.query.width
    })
});


// simple interest
// si = p * n * r / 100
// /simple-interest/10000/5/10 --> 50000
app.get("/simple-interest/:p/:n/:r", (req, res) => {
    res.json({
        interest : req.params.p * req.params.n * req.params.r / 100
    })
});

///simple-interest?p=2121&n=3636&r=33
app.get("/simple-interest/:p/:n/:r", (req, res) => {
    res.json({
        interest : req.query.p * req.query.n * req.query.r / 100
    })
});


// endpoint / api
app.get("/", (req, res) => {
    res.send("<h1>Hi this is Sagar</h1>")
})


// endpoint / api
app.get("/hi", (req, res) => {
    res.send("<h1>Hello</h1>")
})


// enpoint / api
app.get("/how-are-you", (req, res) => {
    res.send("<h1>Fine</h1>")
})


// enpoint / api
app.get("/fact", (req, res) => {

    //text response
    res.send(`{
  "fact": "A cat named Dusty, aged 1 7, living in Bonham, Texas, USA, gave birth to her 420th kitten on June 23, 1952.",
  "length": 107
}`)
})

// enpoint / api
app.get("/fact-v2", (req, res) => {

    //json response
    res.json({
        "fact": "A cat named Dusty, aged 1 7, living in Bonham, Texas, USA, gave birth to her 420th kitten on June 23, 1952.",
        "length": 107
    })
})



app.listen(3001)