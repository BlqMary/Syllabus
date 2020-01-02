import { Course } from '../schemas/course'
import express = require("express")
import { Db } from 'mongodb';

const router = express.Router();

router.post('/course/add', async(req,res)=>{
    try{
        const course = new Course(req.body);
        // course.name = req.body.name;
        // course.ects = req.body.ects;
        // course.semester = req.body.semester;
        // course.rateCount = req.body.rateCount;
        // course.rating = req.body.rating;
        // course.classType = req.body.classType;
        // course.maxStudentsCount = req.body.maxStudentsCount;
        // course.description = req.body.description;
        // course.image = req.body.image;
        // course.participants = req.body.participants;
        // course.voters = req.body.voters;
        course._id = null;
        console.log(course);
        await course.save();
        console.log("tak tu dotarłem");
        res.status(200).send(); 
    }
    catch (error){
        res.status(400).send(error);
    }
});

router.get('/courses', async (req,res) =>{
    try{
        const courses = await Course.find();
        if(!courses){
            throw new Error("Nie znalazło kursów");
        }
        res.status(200).send(courses);
    }
    catch(error){
        res.status(400).send(error);
    }
});

router.post("/course/find", async(req,res) => {
    try{
        const course = await Course.findById(req.body.id);
        if(!course) 
            throw new Error ("Nie istnieje taki kurs");
        res.status(200).send(course);
    }
    catch (error){
        console.log(error);
        res.status(400).send(error);
    }
}); 

router.post("/course/delete", async(req,res) => {
    try{
        if(!req.body.id)
            throw new Error ("Nie istnieje taki kurs");
        await Course.deleteOne({_id : req.body.id });
        res.status(200).send();
    }
    catch (error){
        res.status(400).send(error);
    }
}); 

router.post("/course/update", async(req,res) => {
    try{
        const course = await Course.findById(req.body._id);
        if(!course) 
            throw new Error ("Nie istnieje taki kurs");
        console.log(course);
        await course.updateOne(req.body);
        res.status(200).send();
    }
    catch (error){
        res.status(400).send(error);
    }
}); 

export default router;

