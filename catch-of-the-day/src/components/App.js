import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

/**
This app was created during "React for Beginners" -course by Wes Bos.

App works as the main application of the store page.
It holds the columns for the page and works in the background
*/

class App extends React.Component {

    // creates states for the objects
    state = {
        fishes: {},
        order: {}
    }

    // propType for match
    static propTypes = {
        match: PropTypes.object
    }

    // gets the store name from database, so Firebase can connect to it. Data now persists in the database.
    componentDidMount() {

        // shortening the route
        const { params } = this.props.match;

        //first reinstate our local storage
        const localStorageRef = localStorage.getItem(params.storeId);

        // if there is localStorageRef, set it to state
        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }

        // saves fishes to the order
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    // this saves user's actions
    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    // unmounts, so there shouldn't be any data leaks even if the store is changed
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    // this event saves the inventory's fish into the fishes object
    addFish = fish => {

        // takes a copy of the existing state
        const fishes = { ...this.state.fishes };

        // adds our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;

        // sets the new fishes object to state
        this.setState({ fishes });
    };

    // this event makes the user able to edit fishes' information on the page
    updateFish = (key, updatedFish) => {

        // takes a copy of the current state
        const fishes = { ...this.state.fishes };

        // updates that state
        fishes[key] = updatedFish;

        // sets the update to the state
        this.setState({ fishes });
    };

    // this event makes the user able to delete fishes of their choosing
    deleteFish = (key) => {

        // takes a copy of state
        const fishes = { ...this.state.fishes };

        // updates the state (firebase needs null)
        fishes[key] = null;

        // update state
        this.setState({ fishes });
    }

    // creates a bunch of sample fishes for the menu, so user doesn't need to add everything in
    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    }

    // adds the fish to the order after clicking the button
    addToOrder = key => {

        // takes a copy of state
        const order = { ...this.state.order };

        // either adds to the order, or updates the number in our order
        order[key] = order[key] + 1 || 1;

        // calls setState to update our state object
        this.setState({ order });
    };

    removeFromOrder = key => {

        // takes a copy of state
        const order = { ...this.state.order };

        // remove that item from order
        delete order[key];

        // call setState to update our state object
        this.setState({ order });
    };

    render() {
        return (

            // this div holds the columns for the page
            <div className="catch-of-the-day">

                { /* Menu-column, find all available fish there */ }
                <div className="menu">

                    { /* tag line under page title */ }
                    <Header tagline="Fresh Seafood Market" />

                    { /* fishes and their functionality on the menu */ }
                    <ul className="fishes">
                        {Object.keys(this.state.fishes)
                               .map(key => <Fish
                                   key={key}
                                   index={key}
                                   details={this.state.fishes[key]}
                                   addToOrder={this.addToOrder}
                               />)
                        }
                    </ul>
                </div>

                { /* Order-column, find your order there */ }
                <Order fishes={this.state.fishes}
                       order={this.state.order}
                       removeFromOrder={this.removeFromOrder}
                />

                { /* Inventory-column, add, edit and delete fishes' information there */ }
                <Inventory addFish={this.addFish}
                           updateFish={this.updateFish}
                           deleteFish={this.deleteFish}
                           loadSampleFishes={this.loadSampleFishes}
                           fishes={this.state.fishes}
                           storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}

// exports the page
export default App;