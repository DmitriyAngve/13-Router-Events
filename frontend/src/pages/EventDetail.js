import { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { getAuthToken } from "../util/auth";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;

  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
    headers: {
      "Authorization": "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}
// 317. Attaching Auth Tokens to Outgoing Requests
// CAME FROM auth.js
// STEP 3:
// There we got "action", where I do send that delete request in the end.
// We must add the token to this outgoing request.
// 3.1 Fo that, we ,ust add "headers: {"Authorization"}" with specila "Authorization" header and set that to a value of "Bearer " (don't foget about white space) /// "headers: {"Authorization": "Bearer "}"
// 3.2 Here I then wanna add my "token", but for that I must get my "token" as a first step.
// 3.3 we can use this new "getAuthToken" function which I just added, which imported from "util" folder. And with it imported, we can call it in "action " to get our "token", stored in a "token" constant and add that "token" /// "headers: { Authorization: "Bearer " + token },"
// With that, we're storing the token when we're logging in and we're then using the "token" for attaching it for delete request in this case.
// We can use that "token" for editing events.
// GO TO EventForm.js --->>>
// 317. Attaching Auth Tokens to Outgoing Requests
