// Register.jsx
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./styles/Register.css";
import usePostItems from "../../hooks/usePostItems";
import useForm from "../../hooks/useForm";

const Register = () => {
  const [formData, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const authCtx = useContext(AuthContext);

  const mutation = usePostItems("http://localhost:5000/api/auth/signup");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm)
      return window.alert("Confirm password and password doesn't match! ");
    mutation.mutate(formData, {
      onSuccess: (data) => {
        authCtx.setToken(data.data.token);
        localStorage.setItem("token", JSON.stringify(data.data.token));
      },
    });
  };

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input type="password" id="password" name="confirm" required />
        </div>
        <button type="submit">Register</button>
        <div className="link-wrapper">
          <a href="/login">Already a user? Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
