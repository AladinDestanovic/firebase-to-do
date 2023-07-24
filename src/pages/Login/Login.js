import React, { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  console.log(auth?.currentUser?.email);
  //
  const singIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  const singInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth); //await funkcija pretvara asihrone u sihrone
    } catch (err) {
      console.error(err);
    }
  };
  // localStorage.setItem(auth);
  return (
    <div className="container">
      <div className="card">
        <TextField
          id="outlined-basic"
          label="Email..."
          variant="outlined"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          style={{ margin: "10px" }}
          id="outlined-basic"
          label="Password..."
          variant="outlined"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          style={{ width: "220px" }}
          variant="outlined"
          href="#contained-buttons"
          onClick={singIn}
        >
          Sing in
        </Button>
        <Button
          style={{ width: "220px", margin: "10px" }}
          variant="outlined"
          href="#contained-buttons"
          onClick={singInGoogle}
        >
          continue with google
        </Button>
        <Button
          style={{ width: "220px" }}
          variant="contained"
          href="#contained-buttons"
          onClick={logout}
        >
          logout
        </Button>
      </div>
    </div>
  );
};
export default Login;
