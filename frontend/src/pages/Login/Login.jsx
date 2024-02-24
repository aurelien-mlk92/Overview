import { useNavigate } from "react-router-dom";
import React, { useRef, useContext, useState } from "react";
import Header from "../../components/Header/Header";
import authContext from "../../context/AuthContext";
import imageSign from "../../assets/logo_Mobile.svg";
import "./Login.css";

function Login() {
  const isMobile = window.innerWidth < 1024;
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const auth = useContext(authContext);

  const [isBadCredentials, setIsBadCredentials] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: username.current.value,
            password: password.current.value,
          }),
        }
      );
      if (response.status === 200) {
        const user = await response.json();
        auth.setUser(user);
        auth.setIsLoading(false);
        navigate("/");
      } else {
        console.error("veuillez verifier votre saisie.");
        setIsBadCredentials(true);
        username.current.value = "";
        password.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container_Body_Header">
      {isMobile ? (
        <div className="container_Header_Log">
          <img id="logo_Sign" src={imageSign} alt="logo_Overview" />
        </div>
      ) : (
        <Header />
      )}
      <div className="container_Log">
        <div className="text_Title_Log">
          {/* <h1 className="title_Log">LOG IN</h1> */}
          <h1 id="text_Log">Hey! Welcome back!</h1>
        </div>
        <div className="container_Input_Log">
          <div className="container_Username_Log">
            <p id="text_User">Username</p>
            <input
              type="text"
              id="username_Login"
              placeholder="Username"
              name="username"
              ref={username}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
          <div className="container_Password">
            <p id="text_Pass">Password</p>
            <input
              type="password"
              id="pass_Log"
              placeholder="Password"
              name="password"
              ref={password}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <a className="link_Log" href="/signup">
              Forgot your password?{" "}
            </a>
          </div>
          {isBadCredentials ? (
            <div className="wrong_Credentials_container">
              <p>Wrong credentials. Please try again</p>
            </div>
          ) : (
            ""
          )}
          <div className="container_But_Log">
            <button
              className="signup_Button_Log"
              type="button"
              onClick={handleSubmit}
            >
              LOG IN
            </button>
            <p className="text_Log_End">Don’t have an account yet?</p>
            <button
              className="signup_End_Log"
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
