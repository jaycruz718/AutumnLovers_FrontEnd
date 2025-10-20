import React, { useState } from 'react';
import EventCard from '../components/eventsParts/EventCard';
import EventForm from '../components/eventsParts/EventForm'; 
import autumn1 from '../assets/events/autumn1.jpg';
import autumn2 from '../assets/events/autumn2.jpg';

export default function Events() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Fall Foliage Festival",
      date: "2025-10-21",
      description: "Join us for a weekend of music, food, and vibrant autumn colors.",
      image: autumn1
    },
    {
      id: "2",
      title: "Pumpkin Patch Party",
      date: "2025-10-25",
      description: "Bring the family for pumpkin picking, hayrides, and hot cider!",
      image: autumn2
    },
    {
      id: "3",
      title: "Costume Party @ Cortona Park!",
      date: "2025-10-30",
      description: "Come to our first Halloween Block party!"
    }
  ]);

  // ✅ Handle new event submission
  const handleNewEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now().toString() // Simple unique ID
    };
    setEvents([eventWithId, ...events]); // Add new event to the top
  };

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>

      {/* Show the form ONCE, at the top */}
      <EventForm onSubmit={handleNewEvent} />

      <div className="event-list">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
