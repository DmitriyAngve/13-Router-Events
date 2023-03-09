import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime;
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }
  return null;
}

// 317. Attaching Auth Tokens to Outgoing Requests
// CAME FROM Authentication.js
// STEP 2:
// 2.1 Add a function "getAuthToken", which is exported. In there I'll get my "token" from "localStorage" with help of the ".getItem("token")" by using that "token" key. /// "const token = localStorage.getItem("token")"
// 2.2 Then I return that "token".
// Now we have a function for extracting the "token".
// I wanna use that function in the places where I now do need a token.
// For example in the EventDetail.js file.
// GO TO EventDetail.js --->
// 317. Attaching Auth Tokens to Outgoing Requests

//

// 319. Updating the UI Based on Auth Status
// CAME FROM App.js
// STEP 2:
// 2.1 Add export function "tokenLoader()". In that function I'll simply call "getAuthToken" and return the result of calling that.
// Now I can use that helper function whathever I want.
// NOW BACK IN App.js --->>>
// 319. Updating the UI Based on Auth Status

//

// 321. Adding Route Protection
// CAME FROM App.js
// STEP 1:
// 1.1 Add export function "checkAuthLoader()".
// 1.2 In that function I'll add "getAuthToken()" to see if I have a token /// "const token =  getAuthToken();"
// 1.3 If I don't have a token, then I will return and call redirect to "/auth". /// "if (!token) {return redirect("/auth");}"
// So this "checkAuthLoader()" can be used to protect a route. That's one way of protecting a route.
// Now back in App.js --->>>
// 321. Adding Route Protection

//

// 323. Managing the Token Expiration
// CAME FROM Authentication.js
// STEP 1:
// 1.1 I'll add a new function here, named "getTokenDuration()" and here I want to get back the remaining lifetime of the "token", in milliseconds. I get this information by getting my "expiration" date by accessing "localStorage.getitem("expiration")", by using this key /// "const storedExpirationDate = localStorage.getItem("expiration")"
// 1.2 "storedExpirationDate" I must transform to a date object, by simply passing that "storedExpirationDate", which is a string, to the date constructor. /// "const expirationDate = new Date(storedExpirationDate)"
// 1.3 And also need to a current date. /// "const now = new Date();"
// Difference between the two dates, is the remaining duration.
// 1.4 So the duration in milliseconds can now be calculated by using that "expiration" date, and calling ".getTime()" on it, and deducting "now.getTime" from it. /// "const duration = expirationDate.getTime() - now.getTime"
// If the "expiration" is still in the future, so if the token is still valid, therefore, then this will be a positive value. If "now" is later than the "token" "expiration", so if the "token" did expire, this will be a negative value.
// 1.5 Now I simply return a duration. But I can now use that "duration", from "getTokenDuration", in "getAuthToken" by calling "getTokenDuration" here, to check if  "tokenDuration" is smaller than zero. /// "const tokenDuration = getTokenDuration();"
// 1.6 Add "ifcheck" to check if "tokenDuration" is smaller than zero, which means the "token" expired, because we have no remaining time, it already expired.
// 1.7 In case of already expired I'll return sting: "EXPIRED", which I can use in other parts of my application, to trigger this logout action.

// GO TO Root.js --->>>

// CAME FROM Root.js
// STEP 3:
// 3.1 If we don't even find a "token", then I want to just return.
// If I don't do that, the UI would not be updated correctly, because I would basiccaly return "EXPIRED"
// 323. Managing the Token Expiration
