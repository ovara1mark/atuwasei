import React, { useContext, useState } from "react";
import { NavLink } from "../../atom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./app.css";

export const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navitage("/logout");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <>
      <div className="lg-fm">
        <form onSubmit={handleLogin}>
          <h1 className="lg-h1">Login</h1>
          <p className="lg-p">
            Your details are kept safe and with it you can always gain access!
          </p>
          {error && (
            <span className="lg-fd">Login failed. Invalid Credentials!</span>
          )}
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="btn-lg-md">
            Login
          </button>
          <NavLink to="/signup" className="backed-2">
            <button className="btn-md">Not Registered? Sign Up</button>
          </NavLink>

          <NavLink to="/" className="backed-2 bw-2">
            <button className="btn-m-d">Continue Browing...</button>
          </NavLink>
          <button className="lg-btn">Change password</button>
        </form>
      </div>
    </>
  );
};
