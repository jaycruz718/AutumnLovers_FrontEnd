import { useEffect, useState } from 'react';
// import { getEvents, deleteEvent } from '../api/events';
import { Link } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(res => setEvents(res.data));
  }, []);

  const handleDelete = async (id) => {
    await deleteEvent(id);
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div>
      <h2>Autumn Events</h2>
      <Link to="/events/new">+ Create Event</Link>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            <Link to={`/events/${e.id}`}>{e.title}</Link>
            <button onClick={() => handleDelete(e.id)}></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
