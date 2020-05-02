const exercises = [
    {name: "Jog", description: "A moderately paced run.", category: "Cardio", time: 15},
    {name: "Pushups", description: "Arm and chest workout using only body weight.", category: "Strength", time: 10}
];

function addExercise(exercise){
    exercises.push({...exercise});
    return exercise;
}

function deleteExercise(name){
    const exercise = exercises.find(x => x.name == name);
    if(exercise){
        const index = exercises.indexOf(exercise);
        exercises.splice(index, 1);
    }
    else throw Error("Exercise wasn't found, so it couldn't be deleted.");
    
}

function editExercise(name, updated){
    const exercise = exercises.find(x => x.name == name);
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
        return exercise;
    }
    else throw Error("Exercise not found, so it could not be edited");
}

module.exports = {
    exerciseList: exercises,
    addExercise, deleteExercise, editExercise
}