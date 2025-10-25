
import { useState } from "react";
import ProfileDetails from "../Profile/ProfileDetails";
import ProfileForm from "../Profile/ProfileForm";

export default function ProfilePage({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  function handleSave(updatedData) {
    // Example: update user info locally
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));
    setIsEditing(false);

    // Optionally, send data to backend:
    // fetch('/api/profile', { method: 'PUT', body: JSON.stringify(updatedData) })
  }

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      {isEditing ? (
        <>
          <ProfileForm user={currentUser} onSave={handleSave} />
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <ProfileDetails user={currentUser} />
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
}
