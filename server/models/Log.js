const plan = require('./Plan');

function UpdateProgress(workoutID, timeCompleted) {
    const workout = plan.MyWorkouts.find(x => x.workoutID = workoutID);
    workout.exercise.time -= timeCompleted;
    if(workout.exercise.time <= 0) {
        const i = plan.MyWorkouts.indexOf(workout);
        CompletedWorkouts.push(workout);
        plan.MyWorkouts.splice(i, 1);
    }
}

//function LogRewards() TODO: rewards system for completing workouts

const CompletedWorkouts = [];

module.exports = {
    UpdateProgress
}