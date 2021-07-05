import React, { useState } from "react";
import AuthOptions from "../../components/Auth/AuthOptions";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";
import BackgroundAuth from "../../assets/jpg/background-auth.jpg";
import LogoNameWhite from "../../assets/png/logo-name-white.png";
import "./Auth.scss";

export default function Auth() {
  //saber que formulario esta seleccionado
  const [selectedForm, setSelectedForm] = useState(null);

  //hacer un manejador, donde diga que componente debe de cargar, form de registro, de login , etc
  const handleForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm setSelectedForm={setSelectedForm} />;
      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />;
    }
  };
  return (
    <div className="auth" style={{ backgroundImage: `url(${BackgroundAuth})` }}>
      {/* una capa mas para dar background */}
      <div className="auth__dark"></div>
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoNameWhite} alt="Musicfy" />
        </div>

        {handleForm()}
      </div>
    </div>
  );
}
