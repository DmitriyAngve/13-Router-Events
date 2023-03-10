import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
// 322. Adding Automatic Logout
// After one hour the token should be removed from local storage and the UI should update accordingly. (look at auth.js in backedn folder)
// STEP 1:
// 1.1 In Root.js we can use 'useEffect, that hook could be used to set a timer whanever the root layout is rendered which happens when the application starts (because this very first component for all our routes).
// 1.2 We can go to this root layout and then set up our effect function.
// Idea behind this effect function is that I wanna get my token, and since I'm in the root layout, and I'm getting the token with help of the "tokenLoader", I can use "useLoaderData".
// I don't event need to use "useRouteLoaderData" and use the ID of the route, because I already  in that component.
// 1.3 Get "token" /// "const token = useLoaderData()"
// 1.4 And "token" used as a dependencies for a "useEffect", so "useEffect" function runs whenever the "token" changes.
// 1.5 Add simply "ifcheck" if we don't have a "token". "return" - because there's nothing to do then.
// 1.6 If we do have a "token", I wanna set a "setTimeout(() => {}, timeout)" (timer) I wanna set a timer hat expires after one hour and that triggers that logout action. Basically sends a request to that logout route we added earlier
// 1.7 use "useSubmit()" hook, which gives us a "submit" function. /// "const submit = useSubmit();". which we can use to programmtically submit a form.
// Here I wanna submit that logout form, which I have in my MainNavigation.js file (I wanna send that logout request "<Form action="/logout">")
// 1.8 We can use it also with "submit" function, added in dependecie to "useEffect"
// 1.9 And once that timer expired, I will call submit. null - because no data to submit but I would targer to this logout route. /// "submit(null, { action: "/logout" })"
// 1.10 Set the method to "post" /// "submit(null, { action: "/logout", method: "post" })" and that will therefore trigger that logout route, and start that logout process where we clear the token
// 1.11 Time for timeout: "1 * 60 * 60 * 1000" = 1 hour.

// This solution does have a FLAW
// 322. Adding Automatic Logout

//

// 323. Managing the Token Expiration
// CAME FROM auth.js
// STEP 2:
// 2.1 Here I'm check if I don't have a token. Add "ifcheck" if "token" is equal to "EXPIRED" I also want to trigger this ("submit(null, { action: "/logout", method: "post" });") logout action.
// 2.2 After return because we don't need to set any timer thereafter.
// If we wanna pass this check we know that we have a valid "token".
// 2.3 I want to set a duration here, that takes the remaining lifetime of the "token" into account.
// 2.4 Add "const tokenDuration = getTokenDuration()", that helper function we just added in the util/auth.js file.
// 2.5 then replace timeout with that "tokenDuration".
// With those changes made I just also must make sure that in "getAuthToken", I not always return "EXPIRED", but I also check if we have a "token" at all.

// GO TO auth.js --- >>>
// 323. Managing the Token Expiration
