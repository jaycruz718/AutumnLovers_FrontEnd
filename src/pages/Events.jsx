import React from 'react';
import EventCard from '../components/EventCard';

const sampleEvents = [
  {
    id: "1",
    title: "Fall Foliage Festival",
    date: "2025-10-21",
    description: "Join us for a weekend of music, food, and vibrant autumn colors.",
    image: "/assets/events/fall-festival.jpg"
  },
  {
    id: "2",
    title: "Pumpkin Patch Party",
    date: "2025-10-25",
    description: "Bring the family for pumpkin picking, hayrides, and hot cider!",
    image: "/assets/events/pumpkin-patch.jpg"
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
