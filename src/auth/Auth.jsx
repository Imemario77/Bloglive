import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Auth.css";
import { loginAction, signAction } from "../actions/authAction";

function Auth({ login }) {
  const loading = useSelector((state) => state.AuthReducer.loading);

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loginValid, setLoginValid] = useState(false);
  const [signUp, setSignUp] = useState(login ? login : false);

  const [loginform, setLoginform] = useState({
    fname: "",
    lname: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    fname: "",
    lname: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
    server_feed_back_error: "",
  });
  function handleUserInput(event) {
    const { name, value } = event.target;
    setError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    setError((prev) => {
      return {
        ...prev,
        server_feed_back_error: "",
      };
    });
    setLoginform((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setValidated(true);
    setLoginValid(true);
    if (loginform.fname === "") {
      setError((prev) => {
        setValidated(false);
        return { ...prev, fname: "first name field cant be empty" };
      });
    }
    if (loginform.lname === "") {
      setError((prev) => {
        setValidated(false);
        return { ...prev, lname: "last name field can't be empty" };
      });
    }
    if (loginform.email === "") {
      setError((prev) => {
        setValidated(false);
        setLoginValid(false);
        return { ...prev, email: "email field can't be empty" };
      });
    }
    if (loginform.user_name === "") {
      setError((prev) => {
        setValidated(false);
        return { ...prev, user_name: "user name field can't be empty" };
      });
    }
    if (loginform.password === "") {
      setError((prev) => {
        setValidated(false);
        setLoginValid(false);
        return { ...prev, password: "password field can't be empty" };
      });
    }
    if (loginform.password !== loginform.confirm_password) {
      setError((prev) => {
        setValidated(false);
        return { ...prev, confirm_password: "passwords don't match" };
      });
    }
    if (isChecked && validated && !signUp) {
      dispatch({ type: "AUTH_STARTED" });
      try {
        const result = await signAction(loginform);
        if (result.message) {
          dispatch({ type: "AUTH_FAILED" });
          setError((prev) => {
            return { ...prev, server_feed_back_error: result.message };
          });
        } else {
          console.log(result);
          dispatch({ type: "AUTH_SUCCESS", payload: result.result });
        }
      } catch (error) {
        dispatch({ type: "AUTH_FAILED" });
        console.log(error);
      }
    }
    if (isChecked && loginValid && signUp) {
      dispatch({ type: "AUTH_STARTED" });
      try {
        const result = await loginAction(loginform);
        if (result.message) {
          setError((prev) => {
            dispatch({ type: "AUTH_FAILED" });
            return { ...prev, server_feed_back_error: result.message };
          });
        } else {
          console.log(result.result);
          dispatch({ type: "AUTH_SUCCESS", payload: result.result });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSignUPSWitch = () => {
    setError({
      fname: "",
      lname: "",
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
      server_feed_back_error: "",
    });
    setLoginform({
      fname: "",
      lname: "",
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
    setSignUp((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <div className="auth-holder">
        <h2>{!signUp ? "Sign Up" : "Login"}</h2>
        <p
          style={{
            fontSize: "25px",
            color: "red",
            padding: "0",
            margin: "0",
            textAlign: "center",
          }}
        >
          {error.server_feed_back_error}
        </p>
        <form onSubmit={handleSubmit}>
          {signUp ? (
            <>
              <input
                type="text"
                onChange={handleUserInput}
                placeholder="email or username"
                name="email"
                value={loginform.email}
                autoCorrect="none"
              />
              {error.fname && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {error.email}
                </p>
              )}
              <input
                type="password"
                onChange={handleUserInput}
                placeholder="Password"
                name="password"
                value={loginform.password}
                autoCorrect="none"
              />
              {error.fname && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {error.password}
                </p>
              )}
            </>
          ) : (
            <>
              <input
                type="text"
                onChange={handleUserInput}
                placeholder="First Name"
                name="fname"
                value={loginform.fname}
                autoCorrect="none"
              />
              {error.fname && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {error.fname}
                </p>
              )}
              <input
                type="text"
                name="lname"
                onChange={handleUserInput}
                value={loginform.lname}
                placeholder="Last Name"
                autoCorrect="none"
              />
              {error.lname && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {error.lname}
                </p>
              )}
              <input
                type="text"
                name="user_name"
                onChange={handleUserInput}
                value={loginform.user_name}
                placeholder="User Name"
                autoCorrect="none"
              />
              {error.user_name && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {error.user_name}
                </p>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleUserInput}
                value={loginform.email}
              />
              {error.email && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {error.email}
                </p>
              )}
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleUserInput}
                value={loginform.password}
              />
              {error.password && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {error.password}
                </p>
              )}
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleUserInput}
                value={loginform.confirm_password}
              />
              {error.confirm_password && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  {error.confirm_password}
                </p>
              )}
            </>
          )}
          <span className="remember_me">
            Accept our Terms and Conditions
            <input
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          </span>
          <button
            className={
              !isChecked
                ? "disabled_btn enabled_btn"
                : loading
                ? "disabled_btn enabled_btn"
                : "enabled_btn"
            }
            disabled={!isChecked}
          >
            {signUp ? "Login" : "Sign Up"}
          </button>
          <p
            onClick={handleSignUPSWitch}
            style={{
              textAlign: "center",
              fontSize: "18px",
              padding: "0",
              margin: "0",
            }}
          >
            {!signUp
              ? "Already Have An Account:  Login"
              : "Create An Account:   SignUP"}
          </p>
        </form>
      </div>
    </>
  );
}

export default Auth;
