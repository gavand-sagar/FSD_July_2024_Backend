import { Router } from "express";
import { decrement, getCount, increment } from './counter-handlers.js';

export const counterRoutes = Router();

counterRoutes.get("/get-value", getCount)
counterRoutes.get("/increment", increment)
counterRoutes.get("/decrement", decrement);