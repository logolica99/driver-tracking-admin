import "../styles/loginpage.scss";
import React, { useState, useContext } from "react";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const auth = getAuth();
  const [authState, authDispatcher] = useContext(AuthContext);
  const [success, setSuccess] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const userSignIn = () => {
    setSuccess(true);
    authDispatcher({
      type: "UPDATE_LOADING",
      payload: {
        loading: true,
      },
    });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        authDispatcher({
          type: "LOG_IN",
          payload: {
            email: email,
          },
        });
        authDispatcher({
          type: "UPDATE_LOADING",
          payload: {
            loading: false,
          },
        });
      })
      .catch((error) => {
        setSuccess(false);
        authDispatcher({
          type: "UPDATE_LOADING",
          payload: {
            loading: false,
          },
        });
      });
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-wrapper-title">
          <h2>Login</h2>
        </div>
        <div className="login-wrapper-form">
          <div className="login-wrapper-form-email">
            {!success && (
              <p style={{ color: "red" }}>Email/Pasword is invalid!</p>
            )}
            <TextField
              label="Email"
              fullWidth
              onBlur={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="login-wrapper-form-password">
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              onBlur={(e) => {
                setPassword(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  userSignIn();
                }
              }}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="login-wrapper-button">
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={userSignIn}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
