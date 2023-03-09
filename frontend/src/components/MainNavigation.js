import { Form, NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";

function MainNavigation() {
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
          <li>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </li>
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
