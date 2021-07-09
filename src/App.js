// import logo from './logo.svg';

import "./App.css";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";
// import { > } from "keyboard-key";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged((currentUser) => {
    console.log(currentUser);
    //nota: si se hubiera puesto como variable user en vez de currentUser no pudiera usar el user del hook
    if (!currentUser) {
      setUser(null);
    } else {
      setUser(currentUser);
    }
    setLoading(false);
  });

  if (loading) {
    return null;
  }
  console.log(user);

  // return !user ? <Auth /> : <UserLogged />;

  return (
    <>
      {!user ? <Auth /> : <UserLogged />}
      <ToastContainer
        position="top-center"
        autoClose={99999999995000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

//componentes cuando el usuario este logeado
function UserLogged() {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>Usuario logeado</h1>
      <button onClick={logout}>Cerrar sesion</button>
    </div>
  );
}

export default App;
