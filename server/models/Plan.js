
class Exercise {
    constructor(name, description, category, mins){
        this.name = name;
        this.description = description;
        this.category = category;
        this.time = mins;
    }
}

class Goal{
    constructor(cardioMinutes, strengthMinutes, days){
        this.cardioMinutes = cardioMinutes;
        this.strengthMinutes = strengthMinutes;
        this.days = days;
    }
}

//a node for a linked list containing information about the podcast episode
class Podcast{
    constructor(title, episodeTitle, durationSeconds, audio){
        this.title = title;
        this.episodeTitle = episodeTitle;
        this.duration = durationSeconds;
        this.remaining = durationSeconds;
        this.coverArt = '';
        this.audio = audio;
        this.next = null;
        this.prev = null;
    }
}

module.exports = {
    Exercise, Goal, Podcast
};