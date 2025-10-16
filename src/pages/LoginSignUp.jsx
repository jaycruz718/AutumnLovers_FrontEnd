import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const LoginSignUp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useContext(AuthContext);
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
    try {
      const response = isRegister
        ? await registerUser(formData)
        : await loginUser(formData);
      login(response); // save token to context + localStorage
    } catch (err) {
      alert(err.response?.data?.errors?.[0]?.msg || "Something went wrong");
    }
  };

  return (
    <div className="centered-container">
      <h1>{isRegister ? "Sign Up" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="userName"
            placeholder="Username"
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {isRegister && (
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        )}
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Have an account? Log in" : "New user? Sign up"}
      </button>
    </div>
  );
};

export default LoginSignUp;
