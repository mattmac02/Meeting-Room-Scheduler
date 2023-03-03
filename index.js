class Meeting {
    constructor(start, end) {
      this.start = start;
      this.end = end;
    }
  
    overlapsWith(otherMeeting) {
      return (
        (this.start <= otherMeeting.start && this.end > otherMeeting.start) ||
        (otherMeeting.start <= this.start && otherMeeting.end > this.start)
      );
    }
  }
  

  class Scheduler {
    constructor() {
      this.meetings = [];
    }
  
    book(start, end) {
      const newMeeting = new Meeting(start, end);
  
      for (let i = 0; i < this.meetings.length; i++) {
        if (newMeeting.overlapsWith(this.meetings[i])) {
          return false;
        }
      }
  
      this.meetings.push(newMeeting);   // Add new meeting to the meetings array
      this.displaySchedule();
  
      return true;
    }
  
    cancel(start) {
      for (let i = 0; i < this.meetings.length; i++) {
        if (this.meetings[i].start.getTime() === start.getTime()) {
          this.meetings.splice(i, 1);   // Removing meeting from meetings array
          this.displaySchedule();
  
          return true;
        }
      }
  
      return false;
    }
  
    displaySchedule() {
      const meetingsList = document.getElementById("meetings-list");
      meetingsList.innerHTML = "";
  
      for (let i = 0; i < this.meetings.length; i++) {
        const meeting = this.meetings[i];
        const listItem = document.createElement("li");
        listItem.innerText = `${meeting.start.toLocaleString()} - ${meeting.end.toLocaleString()}`;
        meetingsList.appendChild(listItem);
      }
    }
  }