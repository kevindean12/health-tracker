const mongoose = require('mongoose');
const Exercise = require('./Users').Exercise;

async function addExercise(exercise){
    try{
        const newExercise = new Exercise({
            name: exercise.name,
            description: exercise.description,
            category: exercise.category,
            time: exercise.time
        });
        return await newExercise.save();
    } catch(error) {
        console.error(error);
    }
    
}

async function deleteExercise(name){
    return await Exercise.deleteOne({name: name});
}

async function editExercise(name, updated){
    const exercise = await Exercise.findOne({name: name});
    if(exercise){
        if(updated.category != ''){
            exercise.category = updated.category;
        }
        if(updated.description != ''){
            exercise.description = updated.description;
        }
        if(updated.time != 0){
            exercise.time = updated.time;
        }
        return await exercise.save();
    }
    else throw Error("Exercise not found, so it could not be edited");
}

async function getAllExercises(){
    const exercises = await Exercise.find({});
    const results = [];
    for(let i = 0; i < exercises.length; i++){
        results.push({
            name: exercises[i].name,
            description: exercises[i].description,
            category: exercises[i].category,
            time: exercises[i].time
        });
    }
    return results;
}

module.exports = {
    addExercise, deleteExercise, editExercise, getAllExercises
}