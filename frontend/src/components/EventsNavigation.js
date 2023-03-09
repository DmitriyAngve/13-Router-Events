import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./EventsNavigation.module.css";

function EventsNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Events
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Event
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;

// 319. Updating the UI Based on Auth Status
// CAME FROM MainNavigation.js
// STEP 5:
// 5.1 Use the "useRouteLoaderData()" hook to get our token by getting the loader data from the root route. /// "const token = useRouteLoaderData("token")"
// 5.2 And then we only show this new event link if we have a token and not otherwise, because if we not logged in it makes no sense to show this.

// Do the same with the EventItem.js GO TO --->>>
// 319. Updating the UI Based on Auth Status
