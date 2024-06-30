// Login.jsx
import { useContext, useEffect } from "react";
import usePostItems from "../../hooks/usePostItems";
import { AuthContext } from "../../context/AuthContext";
import "./styles/Login.css";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, handleChange] = useForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (authCtx.token) navigate("/");
  }, [authCtx.token, navigate]);

  const mutation = usePostItems("http://localhost:5000/api/auth/login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password)
      return window.alert("Fill up all the fields");
    mutation.mutate(formData, {
      onSuccess: (data) => {
        authCtx.setToken(data.data.token);
        localStorage.setItem("token", JSON.stringify(data.data.token));
      },
    });
  };

  //   const logInGuest = async (e) => {
  //     e.preventDefault();
  //     mutation.mutate(
  //       { email: "guest@email.com", password: "guest000" },
  //       {
  //         onSuccess: (data) => {
  //           authCtx.setToken(data.data.token);
  //           localStorage.setItem("token", JSON.stringify(data.data.token));
  //         },
  //       }
  //     );
  //   };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
        {/* <button onSubmit={logInGuest} className="btn2">
          Login as Guest
        </button> */}
        <div className="link-wrapper">
          <a href="/register">Not a user? Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
