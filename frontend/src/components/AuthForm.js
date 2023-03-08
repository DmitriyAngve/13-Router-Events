// import { useState } from "react";
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
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
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
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

//

// 315. Validating User Input & Outputting Validation Errors
// STEP 1:
// We make sure that we're showing validation errors or any authentication related errors we might be getting in general
// Here I simply wanna get my action "data". So, the "data" returned by that "action" function that was submitted by that form.
// 1.1 Import "useActionData"
// 1.2 We can get that "data" with help of the "useAction" "data" hook, and we only get that "data" if our "action" returns something, if it returns something else, then a redirect. /// "const data = useActionData();"
// In that case it will return a "response" to us that includes some information about the problem that occurred when trying to authenticate the user.
// 1.3 To output that information to the user, I'll output it below "<h1>{isLogin ? "Log in" : "Create a new user"}</h1>" element and check if the data and check if the "data" is generally set, then I check if an errors object is present on that "data". It will be present if we have validation errors. and if that's the case, then I'll output an unordered list where I loop through all the error information I have. /// "{data && data.errors && <ul>{}</ul>}"
// 1.4 Now, since errors will be an object => "Object.values()" to go throug all the values in this errors object. /// "{<ul>{Object.values(data.errors)}</ul>" /// that will give me an array of all the error messages that I have.
// 1.5 So, I'll then map my error messages to list items, where "key = {err}", and where I'll output the error messages. /// "{Object.values(data.errors).map((err) => (<li key={err}>{err}</li>)"
// 1.6 I will also add another check and check if my "data" have a message, if I have the message property on this "data" object, and if the data object exist, as mentioned. In that case, I'll also output "data.message"
// 1.7 Use "useNavigation" import and call
// 1.8 That hook gives us a "navigation" object, that "navigation" object has a state property, which holds the current submission state, or which lets us know whether we're currently submitting.
// 1.8 Create helper const called is submitting. where I check, where I check if "navigation.state" is equal to submitting. /// "const isSubmitting = navigation.state === "submitting""
// 1.9 In that case, I know that we're currently submitting data and I wanna use that information down there at the bottom for "Save" button.
// 1.10 Add disable that button if we are submitting ("Save")
// 315. Validating User Input & Outputting Validation Errors
