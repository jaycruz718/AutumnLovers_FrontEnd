import React, { useState } from "react";
import "../Posts/PostItems.css";
import axios from "axios";

export default function PostItem({ post, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save post changes
  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:3000/api/post/${post._id}`,
        formData,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Failed to update post.");
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/post/${post._id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      if (onDelete) onDelete(post._id);
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-item">
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post..."
          />
          <div className="post-actions">
            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="view-mode">
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          <small>
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </small>
          <div className="post-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}

