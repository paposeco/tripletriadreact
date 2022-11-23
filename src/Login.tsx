import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfUserIsSignedIn } from "./Firebase";

const Login = function() {
  // check if user is logged in. if yes, forward to waiting room
  const [userloggedin, setuserloggedin] = useState(false);
  const [useremail, setuseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const navigate = useNavigate();

  const checkforsigneduser = async function() {
    const issignedin: [boolean, string] = await checkIfUserIsSignedIn();
    setuserloggedin(issignedin[0]);
    if (issignedin[0]) {
      navigate("/waitingroom");
    }
  };

  const updateemail = function(e) {
    setuseremail(e.currentTarget.value);
  };

  const updatepassword = function(e) {
    setuserpassword(e.currentTarget.value);
  };

  const gotocreateuser = function(e) {
    navigate("/createuser");
  };

  useEffect(() => {
    checkforsigneduser();
  }, []);

  //on submit form, got to waiting room navigate("/waitingroom");

  return (
    !userloggedin && (
      <div>
        <form id="login">
          <label htmlFor="email">
            E-mail:
            <input
              name="email"
              value={useremail}
              type="email"
              id="email"
              onChange={updateemail}
            />
          </label>
          <label htmlFor="password">
            <input
              name="password"
              value={userpassword}
              type="password"
              id="password"
              onChange={updatepassword}
            />
          </label>
        </form>
        <div>
          <p>Don't have a user yet?</p>
          <button onClick={gotocreateuser}>Create user</button>
        </div>
      </div>
    )
  );
};

export default Login;
