const User = require('./Users').User;
const unirest = require('unirest');
const token = require('../models/listenapi').token;

async function SubmitWorkout(userID, workout) {
    const user = await User.findOne({UserID: userID});
    user.Workouts.push({
        Exercises: workout.Exercises,
        Podcasts: workout.Podcasts,
    })
   
    return await user.save();
}

async function addToPlaylist(userID, pod){
    const user = await User.findOne({UserID: userID});
    user.Playlist.push({
        title: pod.title,
        episodeTitle: pod.episodeTitle,
        duration: pod.duration,
        audio: pod.audio,
        coverArt: pod.coverArt
    });
    return await user.save();
}

async function searchPodcasts(keywords, page){
    //TODO need to sanitize user input first...
    const terms = keywords.split(' ');
    if(terms.length > 7) throw Error('Too many search terms');
    let input = '';
    for(let i = 0; i < terms.length-1; i++){
        input += `${terms[i]}%20`;
    }
    input += terms[terms.length-1];
    let response = await unirest.get(`https://listen-api.listennotes.com/api/v2/search?q=${input}&sort_by_date=0&type=episode&offset=${page}&only_in=title%2Cdescription&language=English&safe_mode=0`)
        .header('X-ListenAPI-Key', token);
    return await response.toJSON();
}


async function createGoal(userID, cardio, strength, days){
    const user = await User.findOne({UserID: userID});
    user.Goal.push({
        Cardio: {Amount: cardio*days, Remaining: cardio*days},
        Strength: {Amount: strength*days, Remaining: strength*days},
        Days: days
    });
    return await user.save();
}

async function getFullUser(userID){
    return await User.findOne({UserID: userID});
}

async function exerciseProgress(userID, GID, iWorkout, jExercise, completed){
    const user = await User.findOne({UserID: userID});
    const workout = user.Workouts.find(x => x._id.str == iWorkout);
    const exercise = workout.Exercises[jExercise];
    exercise.time -= completed;

    const goal = user.Goal.find(x => x._id == GID);
    goal[exercise.category].Remaining -= completed;

    const finishedGoal = (goal.Cardio.Remaining <= 0 && goal.Strength.Remaining <= 0);
    if(finishedGoal){
        const index = user.Goal.indexOf(goal);
        user.Completed.Goals.push(goal);
        user.Goal.splice(index, 1);
    }
    
    const finishedExercise = (exercise.time <= 0);
    if(finishedExercise){
        user.Completed.Exercises.push(exercise);
        workout.Exercises.splice(jExercise, 1);
    }

    const finishedWorkout = (workout.Exercises.length == 0);
    if(finishedWorkout){
        const wIndex = user.Workouts.indexOf(workout);
        user.Workouts.splice(wIndex, 1);
    }
    await user.save();
    return {
        Exercise: finishedExercise,
        Workout: finishedWorkout,
        Goal: finishedGoal
    };
}

module.exports = {
    SubmitWorkout, searchPodcasts,
    createGoal, addToPlaylist, exerciseProgress,
    getFullUser
};