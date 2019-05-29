import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

/**
This app was created during "React for Beginners" -course by Wes Bos.

Inventory is for the right column of the market page.
It holds a title and forms for adding and deleting fish.
*/

class Inventory extends React.Component {

    // propTypes to Inventory slots
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    // states for user's id and store's owner
    state = {
        uid: null,
        owner: null
    }

    // checks if the user is logged in when opening the page and if, keeps the user logged in
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user })
            }
        })
    }

    // handles authenticator data
    authHandler = async (authData) => {

        // looks up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);

        // claim it if there is no owner
        if (!store.owner) {

            // save it as own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }

        // sets the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }

    // authenticating
    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null});
}

    render() {

        // logout button
        const logout = <button onClick={this.logout}>Log out!</button>

        //check if the user is logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>;
        }

        // check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    { /* inform the user that they're not the owner */ }
                    <p>Sorry, you are not the owner!</p>

                    { /* log out button */ }
                    {logout}
                </div>
            )
        }

        // if the user is logged in and the owner, show inventory page
        return (

            // this div has the title and forms inside of it
            <div className="inventory">

                { /* title */ }
                <h2>Inventory</h2>

                { /* log out button */ }
                {logout}

                { /* Form for editing the fish form */ }
                {Object.keys(this.props.fishes)
                       .map(key => (
                           <EditFishForm
                               key={key}
                               index={key}
                               fish={this.props.fishes[key]}
                               updateFish={this.props.updateFish}
                               deleteFish={this.props.deleteFish}
                           /> )
                       )
                }

                { /* Form for adding fish, AddFishForm */ }
                <AddFishForm addFish={this.props.addFish} />

                { /* Button to add sample fishes, so user doesn't have to add everything by themselves */ }
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

// exports the file
export default Inventory;