import express from 'express'
import { counterRoutes } from './counter/counter-apis.js';
import { objRoutes } from './object/object-apis.js';
import { arrayRoutes } from './array/array-apis.js';
import { simpleMathRoutes } from './simple-math/simple-apis.js';
import { basicRoutes } from './basic/basic-apis.js';
import { userApis } from './users/users-apis.js';
import { commentApis } from './comments/comments-apis.js';
import { productApis } from './products/products-apis.js';
import { categoriesApis } from './categories/categories-apis.js';
import { config } from 'dotenv'
import { AutherizeMiddleware } from './middleware/auth.js';
import cors from 'cors'
config();

const app = express();

app.use(cors()) // allow access from anywhere

app.use(express.json())// for incoming json request
app.use("/", userApis);
app.use("/", objRoutes)
app.use("/", AutherizeMiddleware, counterRoutes)
app.use("/", AutherizeMiddleware, arrayRoutes)
app.use("/", AutherizeMiddleware, simpleMathRoutes)
app.use("/", AutherizeMiddleware, basicRoutes)
app.use("/", AutherizeMiddleware, commentApis)
app.use("/", AutherizeMiddleware, productApis)
app.use("/", AutherizeMiddleware, categoriesApis)

app.listen(3001, () => {
    console.log("app started....")
})