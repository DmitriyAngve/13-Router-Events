import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
}

// 318. Adding User Logout
// CAME FROM mainNavigation.js
// STEP 2:
// That file won't contain any component because there is no logout page.
// 2.1 I'll just export a "action" function, which clear my "localStorage", which rid off my token.
// 2.2 All I wana do in this action is I wanna reach out to my localStorage and remove my token with the "removeItem" method.
// 2.3 Then I want to return "redirect" and redirect if a user logs out to a starter page.
// Now I can register a new route that only has that "action"
// GO TO App.js --->>

// 318. Adding User Logout
