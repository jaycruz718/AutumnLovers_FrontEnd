import React, { useState, useEffect } from 'react';
import EventCard from '../components/eventsParts/EventCard';
import EventForm from '../components/eventsParts/EventForm';
import autumn1 from '../assets/events/autumn1.jpg'; 
import autumn2 from '../assets/events/autumn2.jpg';
import halloween3 from '../assets/events/halloween3.jpg';
import { getEvents, createEvent } from '../api/events';

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
    description: "Come to our first Halloween Block Party!!!",
    image: halloween3
  }
  ]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await getEvents();
        const fetched = Array.isArray(response.data) ? response.data : [];
        
        // Merge backend events with example ones
        setEvents(prev => [...prev, ...fetched]); 
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchEvents();
  }, []);

  const handleNewEvent = async (newEvent) => {
    try {
      const response = await createEvent(newEvent);

      // Spread exisiting events correctly
      setEvents(previousEvents => [response.data, ...previousEvents]);
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
