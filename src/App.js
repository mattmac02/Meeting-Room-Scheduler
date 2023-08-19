import React, { useState } from 'react';
import './App.css';
import Scheduler from './Scheduler';

function App() {
  const [scheduler] = useState(new Scheduler(2)); // Create a scheduler with 2 meeting rooms. Can be changed to account for more rooms.

  const handleBookSubmit = (event, roomIndex) => {
    event.preventDefault();
  
    const startTimeInput = event.target.querySelector(".start-time");
    const endTimeInput = event.target.querySelector(".end-time");
  
    // Parse input values and format them as required for Date constructor
    const startTime = new Date(startTimeInput.value.replace('T', ' '));
    const endTime = new Date(endTimeInput.value.replace('T', ' '));
  
    if (scheduler.book(startTime, endTime, roomIndex)) {
      startTimeInput.value = "";
      endTimeInput.value = "";
    } else {
      alert("That time slot is already booked. Please choose another.");
    }
  };
  
  const handleCancelSubmit = (event, roomIndex) => {
    event.preventDefault();
  
    const startTimeInput = event.target.querySelector(".cancel-time");
  
    // Parse input value and format it as required for Date constructor
    const startTime = new Date(startTimeInput.value.replace('T', ' '));
  
    if (scheduler.cancel(startTime, roomIndex)) {
      startTimeInput.value = "";
    } else {
      alert("There is no meeting at that time to cancel.");
    }
  };
  return (
    <div className="App">
      <h1>Pivotal Meeting Room Scheduler</h1>

      {scheduler.rooms.map((room, roomIndex) => (
        <div key={roomIndex}>
          <h2>Room {roomIndex + 1}</h2>
          <form className="book" onSubmit={(event) => handleBookSubmit(event, roomIndex)}>
            <label htmlFor={`start-time-${roomIndex}`}>Start Time:</label><br />
            <input type="datetime-local" id={`start-time-${roomIndex}`} className="start-time" required /><br />
            <label htmlFor={`end-time-${roomIndex}`}>End Time:</label><br />
            <input type="datetime-local" id={`end-time-${roomIndex}`} className="end-time" required /><br />
            <button type="submit">Book</button>
          </form>
          <ul id={`meetings-list-${roomIndex}`}></ul>
          <form className="cancel" onSubmit={(event) => handleCancelSubmit(event, roomIndex)}>
            <label htmlFor={`cancel-time-${roomIndex}`}>Cancel Meeting at:</label><br />
            <input type="datetime-local" id={`cancel-time-${roomIndex}`} className="cancel-time" required /><br />
            <button type="submit">Cancel</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;
