
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import PostForm from "../../components/Posts/PostForm";
import PostItem from "../../components/Posts/PostItems";
import ProfileDetail from "../Profile/ProfileDetail";
import ProfileForm from "../Profile/ProfileForm";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/me", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setProfileData(res.data);

        const postsRes = await axios.get(
          `http://localhost:3000/api/post?author=${res.data._id}`
        );
        setUserPosts(postsRes.data);
      } catch (err) {
        console.error("Error loading profile or posts:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  if (loading)
  return (
    <div className="loader">
      <div className="spinner" />
      <p>Loading your profile...</p>
    </div>
  );

  if (!profileData) return <p>Could not load profile.</p>;

  const handlePostCreated = (newPost) => {
    setUserPosts([newPost, ...userPosts]);
  };

  const handleProfileSave = async (updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/user/${profileData._id}`,
        updatedData,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setProfileData(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      {isEditing ? (
        <ProfileForm user={profileData} onSave={handleProfileSave} />
      ) : (
        <ProfileDetail user={{ ...profileData, posts: userPosts }} />
      )}

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>

      <h3>Create a New Post</h3>
      <PostForm authorId={profileData._id} onSubmit={handlePostCreated} />

      <h3>My Posts</h3>
      {userPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        userPosts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            onUpdate={(updatedPost) =>
              setUserPosts(
                userPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
              )
            }
          />
        ))
      )}
    </div>
  );
}
