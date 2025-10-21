export default function ProfileDetail({ user }) {
  return (
    <div className="profile-detail">
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio || "No bio provided."}</p>
      <p><strong>Post:</strong>{user.post || "No post provided."}</p>
    </div>
  );
}
