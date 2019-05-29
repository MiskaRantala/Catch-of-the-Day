import React from "react";
import PropTypes from "prop-types";

/**
This app was created during "React for Beginners" -course by Wes Bos.

AddFishForm is used to add fish for the market.
In AddFishForm, user can type in new fish type's name, price, availability and description and even add an image of it.
*/

class AddFishForm extends React.Component {

    // Create references
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    // propType for addFish
    static propTypes = {
        addFish: PropTypes.func
    }

    // this event is for creating and submitting a new fish object
    createFish = event => {

        // stops the form from submitting
        event.preventDefault();

        // adds constant references to the new object's values: Name, Price, Status, Description and Image
        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        }

        // submits the form
        this.props.addFish(fish);

        // refreshes the form
        event.currentTarget.reset();
    }

    render() {
        return (

            // creates a form for the page
            <form className="fish-edit"
                  onSubmit={this.createFish}
            >

                { /* name of the fish */ }
                <input name="name"
                       ref={this.nameRef}
                       type="text"
                       placeholder="Name"
                />

                { /* price of the fish */ }
                <input name="price"
                       ref={this.priceRef}
                       type="int"
                       placeholder="Price"
                />

                { /* status of the fish, if it's available or not, in a dropdown menu */ }
                <select name="status"
                        ref={this.statusRef}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>

                { /* description about the fish */ }
                <textarea name="desc"
                          ref={this.descRef}
                          placeholder="Desc"
                />

                { /* image of the fish, if available */ }
                <input name="image"
                       ref={this.imageRef}
                       type="text"
                       placeholder="Image"
                />

                { /* button to submit the form */ }
                <button type="submit">+ Add Fish</button>
            </form>
        );
    }
}

// exports the file
export default AddFishForm;