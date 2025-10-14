export default function Home() {
  const user = localStorage.getItem('user');

  return (
    <div>
      <h1>Welcome to Autumn Lovers 🍁</h1>
      {user ? <p>Hi, {user}!</p> : <p>Please <a href="/login">log in</a> to enjoy the full experience.</p>}
    </div>
  );
}
