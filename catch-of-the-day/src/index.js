import React from 'react';
import { render } from 'react-dom';
import Router from "./components/Router";
import "./css/style.css";

// renders router, which redirects people to different places based on their input
render(<Router />, document.querySelector('#main'));