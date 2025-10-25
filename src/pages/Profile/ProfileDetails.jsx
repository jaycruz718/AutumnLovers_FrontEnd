export default function ProfileDetail({ user }) {
  return (
    <div className="profile-detail">
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio || "No bio provided."}</p>

      <div>
        <strong>Posts:</strong>
        {user.posts && user.posts.length > 0 ? (
          <ul>
            {user.posts.map((post) => (
              <li key={post._id}>{post.title}</li>
            ))}
          </ul>
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
}
