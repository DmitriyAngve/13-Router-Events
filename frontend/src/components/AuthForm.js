// import { useState } from "react";
import { Form, Link, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  // const [seacrhParams, setSearchParams] = useSearchParams();
  const [seacrhParams] = useSearchParams();
  const isLogin = seacrhParams.get("mode") === "login";
  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          {/* <Link to="?mode=signup">{isLogin ? "Create new user" : "Login"}</Link> */}
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;

// 313. Working with Query Parameters
//
// STEP 1:
// 1.1 Get rid switch off handler function and "useState" call. And instead now I want to replace my button sown there, which i use for toggling with a link.
// 1.2 import "Link" component from r-r-d. And then replace "button" with that "link".
// 1.3 Set "to=" "" prop on that link.
// 1.4 Let's populate prop on link. /// "<Link to="?mode=signup">" "?" - query parameter, and then the name of parameter. And then should be either log in or sign up, depending on whether we are currently on the login or signup page. That must be set dynamically.
// For setting dynamic query parameters we import special hook from r-r-d
// 1.5 Import "useSearchParams" from r-r-d.
// 1.6 Call "useSearchParams()" and this actually returns an array. We can use array destructuring to get access to the elements in that array. There are two elements in taht array.
// 1.7 First elemet is an object that gives us access to the currently set query parameters ("seacrhParams"); and the second value we get from that array is a function that allows us to update the currently set query parameters ("setSearchParams").
// I don't need that function here, because I will update the query parameter with help of that link that sets the query parameter, but I do need to get access to the currently active query parameters.
// 1.8 Therefore. i will just get that first element and then here we can get the information whether we are in login mode or not by accessing this search patterns object. And then there is a ".get("")" method, which allows us to retrive the value for a specific query parameter. Here it's the "mode" query parameter I wanna retrieve the value for, and I wanna check if the value is equal to "login" /// "const isLogin = seacrhParams.get("mode") === "login";" (if "mode" set to "login").
// If it set to any other value, then I assume that I'm in signup mode.
// 1.9 Use this "isLogic" in our "Link" /// "<Link to={`?mode=${isLogin ? "signup" : "login"}`}>"
// 313. Working with Query Parameters
