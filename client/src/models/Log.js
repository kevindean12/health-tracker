export const Exercises = [
    {
        name: 'Jog',
        description: 'A moderately paced run.',
        minutes: 0,
        date: new Date("2020-3-3")
    }
];
//fetch using ListenNotes
//duration is in seconds (and comes that way from ListenNotes)
export const Playlist = [
    {
        podTitle: 'FiveThirtyEight Politics',
        episode: 'What\'s At Stake On Super Tuesday',
        duration: 3332,
        remaining: 3332
    },
    {
        podTitle: 'Football Weekly',
        episode: 'Liverpool\'s shock loss, more City silverware and German banners - Football Weekly',
        duration: 4000,
        remaining: 4000
    }
];

export const WeeklyGoal = {
    cardioMinutes: 70,
    strengthMinutes: 50,
    days: 5
};

export const CurrentWorkouts = calculateWorkout(WeeklyGoal.cardioMinutes, WeeklyGoal.strengthMinutes, WeeklyGoal.days, Playlist);

export function calculateWorkout(weeklyCardio, weeklyStrength, days, playlist){
    const secondsPerDay = (weeklyCardio*60 + weeklyStrength*60)/days;
    const workouts = [];
    let strength = true;
    for(let i = 0; i < days; i++){
        const workout = new Object();
        workout.day = i+1;
        if(strength){
            workout.exerciseType = "strength";
            strength = !strength;
        } 
        else {
            workout.exerciseType = "cardio";
            strength = !strength;
        }
        workout.workoutPlaylist = [];
        for(let j = 0; j < playlist.length; j++){
            let seconds = secondsPerDay;
            workout.workoutPlaylist.push(playlist[j]);
            seconds -= playlist[j].duration;
            if(seconds <= 0){
                break;
            }
        }
    }
    return workouts;

}



