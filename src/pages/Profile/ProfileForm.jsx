import { useState } from "react";
import "../Profile/ProfileForm.css";

export default function ProfileForm({ user, onSave }) {
    const [formData, setFormData] = useState({ 
        email: user.email || "",
        bio: user.bio || "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(formData); // pass updated data to parent
    }

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="Name"
                       name="Name"
                       value={formData.name}
                       onChange={handleChange}
                       required
                 />
            </div>
            <div>
                <label>Location:</label>
                <input type="location"
                       name="location"
                       value={formData.location}
                       onChange={handleChange}
                       required
                 />
            </div>
            <div>
                <label>Bio:</label>
                <textarea name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Write something about yourself..."
                />
            </div>

            <button type="submit">Save Changes</button>
        </form>
    );
}