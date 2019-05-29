import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

/**
This app was created during "React for Beginners" -course by Wes Bos.

Order is for the middle column of the market page.
It holds a title and user's order from the market place.
*/

class Order extends React.Component {

    // propTypes for Order-column
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    }

    // makes the code smoother
    renderOrder = (key) => {

        // shows the fish
        const fish = this.props.fishes[key];

        // shows how many fish there is
        const count = this.props.order[key];

        // checks if the fish is available
        const isAvailable = fish && fish.status === "available";

        // shortens the need to add this to everything animated
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 }
        }

        // makes sure the fish is loaded before continuing
        if(!fish) return null;

        // if the shop runs out of a certain fish, or the fish is deleted from database
        if(!isAvailable) {
            return (

                // animating the order, _animations.styl
                <CSSTransition { ...transitionOptions }>

                    { /* informing the user if the fish is not available anymore */ }
                    <li key={key}>
                        Sorry, {fish ? fish.name : "fish"} is no longer available.
                    </li>
                </CSSTransition>
            )
        }

        return (

            // animating the order, _animations.styl
            <CSSTransition { ...transitionOptions }>

                { /* sends out order-details and the cost */ }
                <li key={key}>
                    <span>

                        { /* animates single fish's amount changing */ }
                        <TransitionGroup component="span"
                                         className="count"
                        >
                            <CSSTransition
                                classNames="count"
                                key={count}
                                timeout={{ enter:500, exit: 500 }}
                            >
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>

                        { /* sends out fish's name and how it's measured (kg) */ }
                        kg {fish.name}

                        { /* sends out the total price */ }
                        {formatPrice(count * fish.price)}

                        { /* button to remove fish from the order */ }
                        <button onClick={() => this.props.removeFromOrder(key)}>
                            &times;
                        </button>
                    </span>
                </li>
            </CSSTransition>
        )
    };

    render() {

        // this picks up the correct fish from the menu
        const orderIds = Object.keys(this.props.order);

        // this shows the total price of the order
        const total = orderIds.reduce((prevTotal, key) => {

            // shows the fish
            const fish = this.props.fishes[key];

            // shows how many fish there is
            const count = this.props.order[key];

            // checks whether the fish is available or not, even if the fish is in the order already
            const isAvailable = fish && fish.status === "available";
            if (isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);

        return (

            // has the title and elements inside
            <div className="order-wrap">

                { /* title */ }
                <h2>Order</h2>

                { /* listing everything in the user's order */ }
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>

                { /* Shows the total price panel in the app */ }
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

// exports the page
export default Order;