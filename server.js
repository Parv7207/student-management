const express = require("express");
const app = express();
app.use(express.json());
let students =[
    {
        id: 1,
        name: "Raj",
        age: 20,
        course: "BTech"
    },
    {
        id: 2,
        name: "Aman",
        age: 21,
        course: "BTech"
    }
];
app.get("/",(req, res) =>{
    res.send("Backend is running");
});
app.get("/students",(req,res) =>{
    res.json(students);
});
app.get("/students/:id",(req,res) =>{
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }
    const student = students.find((student) => student.id === id);
    if(!student){
        return res.status(404).json({
            message:"Student not found"
        });
    }
    res.json(student);
});
app.post("/students",(req, res) =>{
    const{name, age, course} = req.body;
    if (!name || !age || !course){
        return res.status(400).json({
            message: "Name, age and course are required"
        });
    }
    const newStudent ={
        id: students.length+1,
        name: name,
        age: age,
        course: course
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});
app.put("/students/:id",(req, res) =>{
    const id = Number(req.params.id);
    if (isNaN(id)){
        return res.status(400).json({
            message:"Invalid student ID"
        });
    }
    const student = students.find((student) => student.id === id);
    if (!student){
        return res.status(404).json({
            message:"Student not found"
        });
    }
    const {name, age, course} = req.body;
    if(!name || !age || !course){
        return res.status(400).json({
            message:"Name, age and course are required"
        });
    }
    student.name = name;
    student.age = age;
    student.course = course;
    res.json(student);
});
app.delete("/students/:id", (req, res) =>{
    const id = Number(req.params.id);
    if(isNaN(id)){
        return res.status(400).json({
            message:"Invalid student ID"
        });
    }
    const studentIndex = students.findIndex((student) =>student.id === id);
    if(studentIndex === -1){
        return res.status(404).json({
            message:"Student not found"
        });
    }
    students.splice(studentIndex,1);
    res.json({
        message:"Student deleted successfully"
    });
});
app.listen(3000,() =>{
    console.log("Server running at http://localhost:3000");
});