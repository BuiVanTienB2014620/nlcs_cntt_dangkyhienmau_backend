const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route")
const ApiError = require("./app/api-error")

const app= express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts",contactsRouter);
//handle 404 response 
app.use((req,res,next)=>{
    return next(new ApiError(404,"Resource not found"));
});
//APP
//// define error-handling middleware last, after other app.use() and routes calls

app.use((error,req,res,next)=>{
    //middleware xu ly loi tap trung
    // trong cac doan xu ly route goi next(error)
    //se chuyen ve  middleware xu ly loi nay
    return res.status(error.statuscode || 500).json({
        message:error.message || "Internal Server Error",
    })
})

// to come
app.get("/",(req,res)=>{
    res.json({message:"Welcome to the blood donation center."});
});

module.exports = app;