import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../LoginSignUp/LoginSignUp.css";
import { loginUser, registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && formData.password !== formData.password2) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = isRegister
        ? await registerUser(formData)
        : await loginUser(formData);
      login(response);
      navigate("/"); // Redirect user after Login/SignUp
    } catch (err) { 
      alert(err.response?.data?.errors?.[0]?.msg || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isRegister ? "Sign Up" : "Login"}</h1>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="userName"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {isRegister && (
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <button
          type="button"
          className="toggle-button"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Have an account? Log in" : "New user? Sign up"}
        </button>
      </div>
    </div>
  );
};

export default LoginSignUp;
