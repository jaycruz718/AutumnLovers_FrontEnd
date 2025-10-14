import axios from "axios";
// import { sendMessage } from '../utilities/contact';

export default function AboutContact() {
  const API = 'http://localhost:3000/api/contact';

  //  const sendMessage = (data) => axios.post(API, data);

  return (
    <div>
      <h2>About Autumn Lovers</h2>
      <p>This is a space where people who love fall can connect, share events, and celebrate the season together.</p>

      <h3>Contact Us</h3>
      <p>Email: contact@autumnlovers.com</p>
      <p>Instagram: @autumn.lovers</p>
    </div>
  );
}
