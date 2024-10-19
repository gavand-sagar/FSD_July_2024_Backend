import express from 'express'
import { counterRoutes } from './counter/counter-apis.js';
import { objRoutes } from './object/object-apis.js';
import { arrayRoutes } from './array/array-apis.js';
import { simpleMathRoutes } from './simple-math/simple-apis.js';
import { basicRoutes } from './basic/basic-apis.js';

const app = express();

app.use("/", counterRoutes)
app.use("/", objRoutes)
app.use("/", arrayRoutes)
app.use("/", simpleMathRoutes)
app.use("/", basicRoutes)

app.listen(3001)