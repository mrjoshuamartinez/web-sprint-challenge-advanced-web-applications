import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setLogin({
        ...login,
        [e.target.name]: e.target.value
    });
  };

  const history = useHistory();
  const submitForm = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/login`, login)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        history.push("/BubblePage");
      })
      .catch(err => {
        console.log(`axios Error Return: ${ err }`);
        alert(`Please use "Lambda School" as userName and "i<3Lambd4" as password, Thank you!`);
      });
  };
  return (
    <>
      <form onSubmit={ submitForm }>
          <input
              type="text"
              name="username"
              value={ login.username }
              onChange={ handleChange }
          />
          <input
              type="password"
              name="password"
              value={ login.password }
              onChange={ handleChange }
          />
          <button>Log In</button>
      </form>
    </>
  );
};

export default Login;