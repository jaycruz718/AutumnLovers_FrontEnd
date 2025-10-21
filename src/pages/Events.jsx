import React, { useState, useEffect } from 'react';
import EventCard from '../components/eventsParts/EventCard';
import EventForm from '../components/eventsParts/EventForm';
import { getEvents, createEvent } from '../api/events';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents();
        setEvents(response.data); 
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchEvents();
  }, []);

  const handleNewEvent = async (newEvent) => {
    try {
      const response = await createEvent(newEvent);
      setEvents([response.data, ...events]);
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      <EventForm onSubmit={handleNewEvent} />
      <div className="event-list">
        {Array.isArray(events) && events.map(event => (
          <EventCard key={event.id || event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
