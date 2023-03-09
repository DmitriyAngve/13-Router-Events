import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;

// 312. Project Setup & Route Setup
// CAME FROM App.js
// STEP 2:
// 2.1 Add a new Link for Auth.
// 312. Project Setup & Route Setup

//

// 318. Adding User Logout
// STEP 1:
// 1.1 We wanna add a logout route, and that means that in MainNavigation.js in our navigation component we wanna add a new list item to our navigation bar with a logout button. /// "<li><button>Logout</button></li>"
// This button should then trigger an action or whatever that deletes the token.
// There are different ways of handling this. For example add a on click listener and trigger a function that reaches out to "localStorage" and deletes the token. But I'll use the more official React routing appoach, and I'll add a new route.
// 1.2 add a new file called Logout.js
// GO TO Logout.js --->>>
// CAME FROM from App.js
// STEP 4:
// 4.1 I'll wrap my button with form, that's provided by r-r-d.
// 4.2 Add "action" into "<Form>" and method /// "<Form action="/logout" method="post">"
// 318. Adding User Logout

//

// 319. Updating the UI Based on Auth Status
// CAME FROM App.js
// STEP 4:
// 4.1 We can use "useRouteLoaderData" hook to get our token here by targeting the root route. /// "const token = useRouteLoaderData("root");"
// And we know that what will get here is the token because that is what the that root routes loader does return.
// The "tokenLoader" (in auth.js) does return the token ("getAuthToken()").
// If that token exist we're logged in. and if it does not exist (if "token === undefined"), we're not logged in.
// 4.2 We can conditionally show that authentication link ("<NavLink>") by checking if token exist and only rendering this list item if it does exist. Throuh that would show it if we are logged in and we want the opposite, hence I'll add an excalamtion mark.
// Now that authentication link is only shown if we're not logged in, if we don't have a token.
// 4.3 On the other hand that "Logout" button should only be shown if we are logged in. Opposite logic --- if we have a "token", then I render list item.

// We can use the same approach to shown or not "Edit" and "Delete" buttons, or "New Event" button.
// For that GO TO EventsNavigation.ks --->>> where I have "New Event" button.
// 319. Updating the UI Based on Auth Status
