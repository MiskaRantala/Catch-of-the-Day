import React from "react";
import PropTypes from "prop-types";

/**
This app was created during "React for Beginners" -course by Wes Bos.

This is a title for the store page.
 */
const Header = (props) => (
    <header className="top">

        { /* this title has Catch of the Day inside of it */ }
        <h1>
            Catch

            { /* this span uses css to set 'of' and 'the' around the anchor accordingly */ }
            <span className="ofThe">
                    <span className="of">Of</span>
                    <span className="the">The</span>
                </span>
            Day
        </h1>

        { /* this title has the tag line inside of it */ }
        <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
    </header>
);


Header.propTypes = {
    tagline: PropTypes.string.isRequired
}

// exports the file
export default Header;