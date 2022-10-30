// Imports
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import { Request, Response, NextFunction } from "express";
import methodOverride from 'method-override';

// Connect to data source
AppDataSource.initialize()
    .then(() => {
        console.log(">> DATA-SOURCE INITIALIZED SUCCESSFULLY");
    })
    .catch((error) => console.log(">> ERROR OCCURED WHILE INITIALIZING DATASOURCE: ", error))

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
import mainRoute from "./routes/main";
app.use('/', mainRoute);

// Not Found Page.
app.all( '*' , (req, res, next) => {
    const err = {message: "Requested page is Not FOUND", stack:''};
    res.status(404).send(err);
})

// All Error Handling Middleware
app.use( (err:any, req:Request, res:Response, next:NextFunction) =>{
    const {statusCode = 500} = err;
    if(!err.message) err.message = "O Ooo! Something Went Wrong!";
    res.status(statusCode).send({error: err});
})


app.listen(PORT, ()=> console.log(`>> LISTINING TO PORT: ${PORT}`));