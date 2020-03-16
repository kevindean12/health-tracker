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

function addExercise(name, description, category, time){
    exercises.push(new Exercise(name, description, category, time));
}

module.exports = {
    exerciseList: exercises,
    addExercise: addExercise
}