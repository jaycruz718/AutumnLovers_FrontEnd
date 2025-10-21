import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvent, updateEvent } from '../api/events';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEvent(id).then(res => setEvent(res.data));
  }, [id]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateEvent(id, event);
    navigate('/events');
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Event</h2>
      <input name="title" value={event.title} onChange={handleChange} />
      <textarea name="description" value={event.description} onChange={handleChange}></textarea>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
