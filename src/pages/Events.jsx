import React from 'react';
import EventCard from '../components/EventCard';
import autumn1 from '../assets/events/autumn1.jpg';
import autumn2 from '../assets/events/autumn2.jpg';

const sampleEvents = [
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
];

export default function Events() {
  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {sampleEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
