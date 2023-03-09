import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// 312. Project Setup & Route Setup
// STEP 1:
// 1.1 Here I wanna add a new route definition for "auth" route. The "auth" should still be part of my route layout "<RootLayout>". I still want to have that navigation on top of it and so on. It will be a sibling route to "<HomePage>" and entire route stack of my events routes. (path: "auth", element: <AuthenticationPage />)
// GO TO MainNavigation.js for adding Auth to navigation --->>>
// 312. Project Setup & Route Setup

//

// 314. Implementing the Auth Action
// CAME FROM Authentication.js
// STEP 2:
// 2.1 import "action" as "authAction". This "action" is now set up as an action here on this route /// "action: authAction"
// 314. Implementing the Auth Action

//

// 318. Adding User Logout
// CAME FROM Logout.js
// STEP 2:
// 2.1 Let register a new route that only has that "action" and no component.
// 2.2 Add a new route below the all other routes. New route will have a "path" and imported function "action". /// "path: "logout",action: logoutAction,"
// 2.3 Now we can send a request to this route. We can sunmit a form that targets this route that I'll do in MainNavigation.js
// GO TO MainNavigation.js --->>>
// 318. Adding User Logout

//

// 319. Updating the UI Based on Auth Status
// If the "token" would be removed, because we log out, the UI automatically updates.
// We could use React Context for managing that "token" across the entire application, instead of using r-r-d.
// Let's use a r-r-d for that.
// STEP 1:
// 1.1 Add a "loader", which simply takes a look at "localStorage" and extracts the token from "localStorage". And that token would then be available through the loader data of that root route in all other routes.
// React router will automatically reevaluate that if we logout, if we submit that logout form. So it will then refetch that token and for example determine that the token doesn't exist and then update all the pages that use that loader data from that root route.
// GO TO my utility file -> auth.js to separate file in my off utility file.--->>>

// CAME FROM auth.js
// STEP 3:
// 3.1 Import "tokenLoader" and use on that root route.
// 3.2 Now this ("loader: tokenLoader,") will be called whenever a new navigation action occurs, because we triggered a logout and therefore we will check the current status of the token whenever the user does anything on the page whenever the user submits a form or navigates around. And that therefore ensures that we always have the latest information about that token.
// Now we can use it "tokenLoader" in all other routes.
// 3.3 In order to use data from that loader and easily get access to it, I'll assign an ID to that route. /// "id: "root"".
// GO TO MainNavigation.js --->>>
// 319. Updating the UI Based on Auth Status
