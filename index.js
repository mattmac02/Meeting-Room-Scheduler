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
    constructor(numRooms) {
      this.rooms = [];
      for (let i = 0; i < numRooms; i++) {
        this.rooms.push({ meetings: [] });
      }
    }
  
    book(start, end, roomIndex) {
      const newMeeting = new Meeting(start, end);
  
      const meetings = this.rooms[roomIndex].meetings;
      for (let i = 0; i < meetings.length; i++) {
        if (newMeeting.overlapsWith(meetings[i])) {
          return false;
        }
      }
  
      meetings.push(newMeeting); // Add new meeting to the meetings array of the specified room
      this.displaySchedule(roomIndex);
  
      return true;
    }
  
    cancel(start, roomIndex) {
      const meetings = this.rooms[roomIndex].meetings;
      for (let i = 0; i < meetings.length; i++) {
        if (meetings[i].start.getTime() === start.getTime()) {
          meetings.splice(i, 1); // Removing meeting from meetings array of the specified room
          this.displaySchedule(roomIndex);
  
          return true;
        }
      }
  
      return false;
    }
  
    displaySchedule(roomIndex) {
      const meetingsList = document.getElementById(`meetings-list-${roomIndex}`);
      meetingsList.innerHTML = "";
  
      const meetings = this.rooms[roomIndex].meetings;
      for (let i = 0; i < meetings.length; i++) {
        const meeting = meetings[i];
        const listItem = document.createElement("li");
        listItem.innerText = `${meeting.start.toLocaleString()} - ${meeting.end.toLocaleString()}`;
        meetingsList.appendChild(listItem);
      }
    }
  }
  
  const scheduler = new Scheduler(2); // Create a scheduler with 2 meeting rooms. Can be changed to account for more rooms.
  
  const bookForms = document.querySelectorAll("form.book");
  bookForms.forEach((bookForm, roomIndex) => {
    bookForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const startTimeInput = bookForm.querySelector(".start-time");
      const endTimeInput = bookForm.querySelector(".end-time");
  
      const startTime = new Date(startTimeInput.value);
      const endTime = new Date(endTimeInput.value);
  
      if (scheduler.book(startTime, endTime, roomIndex)) {
        startTimeInput.value = "";
        endTimeInput.value = "";
      } else {
        alert("That time slot is already booked. Please choose another.");
      }
    });
  });
  
  const cancelForms = document.querySelectorAll("form.cancel");
  cancelForms.forEach((cancelForm, roomIndex) => {
    cancelForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const startTimeInput = cancelForm.querySelector(".cancel-time");
  
      const startTime = new Date(startTimeInput.value);
  
      if (scheduler.cancel(startTime, roomIndex)) {
        startTimeInput.value = "";
      } else {
        alert("There is no meeting at that time to cancel.");
      }
    });
  });
  