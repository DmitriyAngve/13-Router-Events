export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
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
