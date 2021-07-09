import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/auth";
import {toast} from 'react-toastify'

import { validateEmail } from "../../../utils/Validations";
import "./RegisterForm.scss";
// import { errorFromList } from "verror";

export default function RegisterForm({ setSelectedForm }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {

    toast.success("Error...")

    setFormError({});
    let errors = {};
    let formOk = true;

    console.log("ok", formData);

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("Registro completado");
        })
        .catch(() => {
          console.log("error al crear la cuenta");
          // setIsLoading(false); por que en finally se cumple
        })
        .finally(() => {
          setIsLoading(false); 
          setSelectedForm(null)
        });
      console.log("formulario valido");
    }
  };

  const onChange = (e) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis.</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electrónico"
            icon="mail outline"
            //   onChange={}
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, ingresa un correo valido
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
            //   onChange={}
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              Por favor, ingresa una contraseña mayor de 6 caracteres
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="¿Como deberiamos llamarte?"
            icon="user circle outline"
            //   onChange={}
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">Por favor, ingresa un nombre</span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Continuar
        </Button>
      </Form>

      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿Ya tienes Musicfy?{" "}
          <span
            onClick={() => {
              setSelectedForm("login");
            }}
          >
            Iniciar sesión
          </span>
        </p>
      </div>
    </div>
  );
}
function defaultValueForm() {
  return {
    email: "",
    password: "",
    username: "",
  };
}
