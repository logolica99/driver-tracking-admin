import "./App.css";
import "./firebaseConfig";
import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Dialog,DialogContent } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/Homepage";


function App() {
  const [authState] = useContext(AuthContext);

  return (
    <div className="App">
      <Dialog open={authState.loading}>
        <DialogContent>
          <CircularProgress size={90} />
        </DialogContent>
      </Dialog>
      {authState.isLoggedIn ? <HomePage/> : <LoginPage />}
    </div>
  );
}

export default App;
