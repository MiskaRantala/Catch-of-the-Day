import React from 'react';
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

/**
This app was created during "React for Beginners" -course by Wes Bos.

StorePicker is the first page of the store application.
In StorePicker, user can type a shop they want to the text box and the program will send them to that location.

For example: typing in Funny Cat Videos store will send user to "/store/funnycatvideos.
 */

class StorePicker extends React.Component {

    // creates a ref for text box input
    myInput = React.createRef();

    // propTypes for StorePicker page
    static propTypes = {
        history: PropTypes.object
    }

    // creates an event to get to the chosen store
    goToStore = event => {

        // stops the form from submitting
        event.preventDefault();

        // gets the text from that input
        const storeName = this.myInput.current.value;

        // changes the page to /store/'user-entry'
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        return (

            // this form is to help users get to the wanted store page
            <form className="store-selector"
                  onSubmit={this.goToStore}
            >

                { /* Title of the page, suggesting user to enter the store */ }
                <h2>Please Enter A Store</h2>

                { /* gives a funny random name for the text box */ }
                <input type="text"
                       ref={this.myInput}
                       placeholder="Store Name"
                       defaultValue={getFunName()}
                />

                { /* button to go to /store/whatever-they-entered */ }
                <button type="submit">Visit Store --></button>
            </form>
        );
    }
}

// exports the page
export default StorePicker;