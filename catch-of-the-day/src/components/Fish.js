import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

/**
 This app was created during "React for Beginners" -course by Wes Bos.

 Fish is for the left column of the market page.
 It holds the menu for the fish under the title and tag line.
 */

class Fish extends React.Component {

    // props for all fishes
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number,

        }),

        addToOrder: PropTypes.func
    }

    render() {

        // shortening the paths of fish details
        const { image, name, price, status, desc } = this.props.details;

        // boolean to check, if the fish is available
        const isAvailable = status === "available";

        return (

            // list has the fishes' image, title and other information inside
            <li className="menu-fish">

                { /* image of the fish/name of the fish, if image is unavailable */ }
                <img src={image}
                     alt={name}
                />
                <h3 className="fish-name">

                    { /* name of the fish */ }
                    {name}

                    { /* price of the fish */ }
                    <span className="price">{formatPrice(price)}</span>
                </h3>

                { /* description of the fish */ }
                <p>{desc}</p>

                { /* availability of the fish and possibility to add them to order */ }
                <button disabled={!isAvailable}
                        onClick={() => this.props.addToOrder(this.props.index)}
                >

                    { /* if available, we can add it to order, otherwise it'll disable the button */ }
                    {isAvailable ? "Add To Order" : "Sold Out!"}
                </button>
            </li>
        );
    }
}

// exports the page
export default Fish;                     