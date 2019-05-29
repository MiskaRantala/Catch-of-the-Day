import React from "react";
import PropType from "prop-types";

/**
 This app was created during "React for Beginners" -course by Wes Bos.

 Login is used to authenticate the creator of this page to change menu items.
 Owner can log in with GitHub, Twitter or Facebook and then edit information from Inventory column.
 */

const Login = props => (
    <nav className="login">

        { /* title and info how to get to editing Inventory column */ }
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory. </p>

        { /* login button for GitHub accounts */ }
        <button className="github"
                onClick={() => props.authenticate("Github")}
        >
            Log In With GitHub
        </button>

        { /* login button for Twitter accounts */ }
        <button className="twitter"
                onClick={() => props.authenticate("Twitter")}
        >
            Log In With Twitter
        </button>

        { /* login button for Facebook accounts */ }
        <button className="facebook"
                onClick={() => props.authenticate("Facebook")}
        >
            Log In With Facebook
        </button>
    </nav>
);

Login.propTypes = {
    authenticate: PropType.func.isRequired
}

export default Login;