import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";

/**
This app was created during "React for Beginners" -course by Wes Bos.

Router helps StorePicker to redirect users based on their input

For example: typing in Funny Cat Videos will send user to "/store/funnycatvideos.
 */

// sends user where they decided to go
const Router = () => (
    <BrowserRouter>

        { /* switch directs user to a route based on user's input */ }
        <Switch>

            { /* if user types nothing, this directs user to StorePicker */ }
            <Route exact path="/" component={StorePicker} />

            { /* if user types e.g. /store/123, this directs user into App.js/store 123 */ }
            <Route path="/store/:storeId" component={App} />

            { /* if user types something else, this directs user into NotFound */ }
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

// exports the file
export default Router;