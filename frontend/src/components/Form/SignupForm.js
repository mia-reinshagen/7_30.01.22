import React, { useState,useEffect } from "react";
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormSection,
  FormRow,
  FormLabel,
  FormInputRow,
  FormSuccess,
  FormError,
  FormButton,
  FormTitle,
} from "./FormStyles";
import { Container } from "../../globalStyles";
import axios from "axios";

const SignupForm = () => {

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmPass !== password) {
      setError("Le mot de passe ne correspond pas");
      return;
    }
    const newUser = {
      username: username,
      email: email,
      password: password,
      isAdminAccount: 0,
    };

    axios
      .post("http://localhost:3500/api/auth/signup", newUser)
      .then((response) => {
        setError('');
        setSuccess(response.data.message);
       
      })
      .catch((err) => {
		  console.log(err.response)
        setError(err.response.data.message);
        setSuccess("")
        console.log(error)
      });
  };



  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  const formData = [
    {
      label: "Pseudo",
      value: username,
      onChange: (e) => setUserName(e.target.value),
      type: "text",
    },
    {
      label: "Email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      type: "email",
    },
    {
      label: "Mot de passe",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      type: "mot de passe",
    },
    {
      label: "Verifier Mot de passe",
      value: confirmPass,
      onChange: (e) => setConfirmPass(e.target.value),
      type: "password",
    },
  ];
  return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>Sign up</FormTitle>
            <FormWrapper onSubmit={handleSubmit} noValidate>
              {formData.map((el, index) => (
                <FormInputRow key={index}>
                  <FormLabel>{el.label}</FormLabel>
                  <FormInput
                    type={el.type}
                    placeholder={`Veuillez entrer votre ${el.label.toLocaleLowerCase()}`}
                    value={el.value}
                    onChange={el.onChange}
                  />
                </FormInputRow>
              ))}

              <FormButton type="submit">Signup</FormButton>
            </FormWrapper>
           { console.log(error)}
            {error !=="" && (
              <FormError
                variants={messageVariants}
                initial="hidden"
                animate="animate"
              >
                {error}
              </FormError>
            )}

            {success !=="" && (
              <FormSuccess
                variants={messageVariants}
                initial="hidden"
                animate="animate" 
              >
                {success}
              </FormSuccess>
            )}
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
};

export default SignupForm;
