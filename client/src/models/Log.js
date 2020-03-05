class Exercise {
    constructor(name, description, category, mins){
        this.name = name;
        this.description = description;
        this.category = category;
        this.time = mins;
    }
}

class Goal{
    constructor(cardioMinutes, strengthMinutes, days, exercises){
        this.cardioMinutes = cardioMinutes;
        this.strengthMinutes = strengthMinutes;
        this.days = days;
        this.exercises = exercises;
    }
}

class Workout {
    constructor(exercises, playlist){
        this.playlist = playlist;
        this.exercises = exercises;
    }

    get time(){
        let count = 0;
        for(let i = 0; i < this.exercises.length; i++){
            count += this.exercises[i].time;
        }
        return count;
    }
}

//a node for a linked list containing information about the podcast episode
class Podcast{
    constructor(title, episodeTitle, durationSeconds){
        this.title = title;
        this.episodeTitle = episodeTitle;
        this.duration = durationSeconds;
        this.remaining = durationSeconds;
        this.next = null;
        this.prev = null;
    }
}

//a linked list representing a playlist
class Playlist {
    constructor(user, playlistName){
        this.user = user;
        this.name = playlistName;
        this.head = null;
    }

    size(){
        let temp = this.head;
        let count = 0;
        while(temp != null){
            temp = temp.next;
            count++;
        }
        return count;
    }

    add(episode){
        if(this.head == null){
            this.head = episode;
        }
        else {
            let temp = this.head;
            while(temp.next != null){
                temp = temp.next;
            }
            temp.next = episode;
            episode.prev = temp;
        }
        return this;
    }

}

const Exercises = [
    new Exercise("Jog", "A moderately paced run.", "Cardio", 15),
    new Exercise("Pushups", "Arm and chest workout using only body weight.", "Strength", 10)
];


//fetch episodes using ListenNotes
//duration is in seconds (and comes that way from ListenNotes)
const UserPlaylist = new Playlist("Kevin", "Default")
    .add(new Podcast("FiveThirtyEight Politics", "What's At Stake On Super Tuesday", 3332))
    .add(new Podcast("Football Weekly", "Liverpool's shock loss, more City silverware and German banners - Football Weekly", 4000));



export const CurrentGoal = new Goal(70, 50, 5, Exercises);
export const WorkoutSchedule = [new Workout(Exercises, UserPlaylist)];






