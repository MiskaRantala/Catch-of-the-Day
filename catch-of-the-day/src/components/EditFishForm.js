import React from "react";
import PropTypes from "prop-types";

/**
 This app was created during "React for Beginners" -course by Wes Bos.

 EditFishForm is used to edit the information of existing fish.
 In EditFishForm, user can change fishes' name, price, availability and description and image.
 */

class EditFishForm extends React.Component {


    // propTypes for editFish
    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func
    }

    // update that fish
    handleChange = (event) => {

        // takes a copy of the current fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };

        // sends the changes to the page
        this.props.updateFish(this.props.index, updatedFish);
    };

    render() {

        // creates a box, where the information can be changed
        return <div className="fish-edit">

            { /* name of the fish */ }
                <input name="name"
                       type="text"
                       onChange={this.handleChange}
                       value={this.props.fish.name}
                />

                { /* price of the fish */ }
                <input name="price"
                       type="int"
                       onChange={this.handleChange}
                       value={this.props.fish.price}
                />

                { /* status of the fish, if it's available or not, in a dropdown menu */ }
                <select name="status"
                        type="text"
                        onChange={this.handleChange}
                        value={this.props.fish.status}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>

                { /* description about the fish */ }
                <textarea
                    name="desc"
                    onChange={this.handleChange}
                    value={this.props.fish.desc}
                >
                </textarea>

                { /* image of the fish, if available */ }
                <input name="image"
                       type="text"
                       onChange={this.handleChange}
                       value={this.props.fish.image}
                />
                <button onClick={() => this.props.deleteFish(this.props.index)}>
                    Remove fish
                </button>
        </div>
    }
}

// exports the file
export default EditFishForm;