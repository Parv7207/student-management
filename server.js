const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Student = require("./models/Student");
const app = express();
app.use(express.json());

app.get("/",(req, res) =>{
    res.send("Backend is running");
});
app.get("/students", async(req,res) =>{
    try{
        const students = await Student.find();
        res.json(students);
    } catch(error){
        res.status(500).json({message:"Failed to fetch students"});
    }
});
app.get("/students/:id", async(req, res) =>{
    try{
        const student = await Student.findById(req.params.id);
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        res.json(student);
    } catch(error){
        res.status(400).json({message:"Invalid student ID"});
    }
});

app.post("/students", async(req,res) =>{
    try{
        const{name,age,course} =req.body;
        if(!name || !age ||!course){
            return res.status(400).json({
                message:"Name, age and course are required"
            });
        }
        const student = await Student.create({
            name,
            age,
            course
        });
        res.status(201).json(student);
    } catch(error) {
        res.status(500).json({message:"Failed to create student"});
    }
});

app.put("/students/:id", async(req,res) =>{
    try{
        const{name,age,course} = req.body;
        if(!name || !age || !course){
            return res.status(400).json({
                message:"Name, age and course are required"
            });
        }
        const student = await Student.findByIdAndUpdate(req.params.id,
            {name, age, course},
            {new:true}
        );
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        res.json(student);
    } catch(error){
        res.status(400).json({message:"Invalid student ID"});
    }
});

app.delete("/students/:id", async(req,res) =>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        res.json({message:"Student deleted successfully"});
    } catch(error){
        res.status(400).json({message:"Invalid student ID"});
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log("MongoDB connected successfully");
        app.listen(3000,() =>{
            console.log("Server running on port 3000");
        });
    })
    .catch((error) =>{
        console.log("MongoDB connection failed",error.message);
    });
    const PORT = process.env.PORT || 3000;
