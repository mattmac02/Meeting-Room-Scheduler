import React, { useState } from 'react';
import './App.css';
import Scheduler from './Scheduler';

function App() {
  const [numRooms, setNumRooms] = useState(2);
  const [scheduler, setScheduler] = useState(new Scheduler(numRooms));

  const handleRoomChange = (newNumRooms) => {
    setNumRooms(newNumRooms);
    setScheduler(new Scheduler(newNumRooms));
  };

  const handleBookSubmit = (event, roomIndex) => {
    event.preventDefault();

    const startTimeInput = event.target.querySelector('.start-time');
    const endTimeInput = event.target.querySelector('.end-time');

    const startTime = new Date(startTimeInput.value.replace('T', ' '));
    const endTime = new Date(endTimeInput.value.replace('T', ' '));

    if (scheduler.book(startTime, endTime, roomIndex)) {
      startTimeInput.value = '';
      endTimeInput.value = '';
    } else {
      alert('That time slot is already booked. Please choose another.');
    }
  };

  const handleCancelSubmit = (event, roomIndex) => {
    event.preventDefault();

    const startTimeInput = event.target.querySelector('.cancel-time');

    const startTime = new Date(startTimeInput.value.replace('T', ' '));

    if (scheduler.cancel(startTime, roomIndex)) {
      startTimeInput.value = '';
    } else {
      alert('There is no meeting at that time to cancel.');
    }
  };

  return (
    <div className="App">
      <h1 className="header">Pivotal Meeting Room Scheduler</h1>
      <button className="button" onClick={() => handleRoomChange(numRooms + 1)}>
        Add Meeting Room
      </button>
      <div className="rooms-container">
        {scheduler.rooms.map((room, roomIndex) => (
          <div className="room" key={roomIndex}>
            <h2 className='header2'>Room {roomIndex + 1}</h2>
            <form className="form" onSubmit={(event) => handleBookSubmit(event, roomIndex)}>
              <label className="label" htmlFor={`start-time-${roomIndex}`}>Start Time:</label><br />
              <input type="datetime-local" id={`start-time-${roomIndex}`} className="input start-time" required /><br />
              <label className="label" htmlFor={`end-time-${roomIndex}`}>End Time:</label><br />
              <input type="datetime-local" id={`end-time-${roomIndex}`} className="input end-time" required /><br />
              <button className="button2" type="submit">Book</button>
            </form>
            <ul  className="meetings-list"><h3 className='label'>Booked Meetings</h3>
              <li id={`meetings-list-${roomIndex}`}></li>
            </ul>
            <form className="form cancel" onSubmit={(event) => handleCancelSubmit(event, roomIndex)}>
              <label className="label" htmlFor={`cancel-time-${roomIndex}`}>Cancel Meeting at:</label><br />
              <input type="datetime-local" id={`cancel-time-${roomIndex}`} className="input cancel-time" required /><br />
              <button className="button2" type="submit">Cancel</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
