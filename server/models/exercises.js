// class Exercise {
//     constructor(name, description, category, mins){
//         this.name = name;
//         this.description = description;
//         this.category = category;
//         this.time = mins;
//     }
// }

const exercises = [
    {name: "Jog", description: "A moderately paced run.", category: "Cardio", time: 15},
    {name: "Pushups", description: "Arm and chest workout using only body weight.", category: "Strength", time: 10}
];

function addExercise(exercise){
    exercises.push(exercise);
    return exercise;
}

module.exports = {
    exerciseList: exercises,
    addExercise: addExercise
}