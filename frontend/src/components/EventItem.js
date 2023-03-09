import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default EventItem;

// 319. Updating the UI Based on Auth Status
// CAME FROM EventsNavigation.js
// STEP 6:
// 6.1 There I aslo use "useRouteLoaderData" hook.
// That information can might be used to conditionally show that menu.
// 6.2 I only wanna show it if we have a token.
// 319. Updating the UI Based on Auth Status
