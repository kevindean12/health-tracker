class Exercise {
    constructor(name, description, category, mins){
        this.name = name;
        this.description = description;
        this.category = category;
        this.time = mins;
    }
}

const exercises = [
    new Exercise("Jog", "A moderately paced run.", "Cardio", 15),
    new Exercise("Pushups", "Arm and chest workout using only body weight.", "Strength", 10)
];

function addExercise(exercise){
    exercises.push(exercise);
    return exercise;
}

module.exports = {
    exerciseList: exercises,
    addExercise: addExercise
}