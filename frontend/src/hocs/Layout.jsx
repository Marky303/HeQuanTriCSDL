import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../components/Navbar';

// Explaination: Chug your preferred layout of the webpage in this class below
// Eg: Currently it has Navbar (selfexplainatory) and Outlet tag which
// renders whatever it is rendering from nested routes
const Layout = (props) => (
    <>
        <Navbar>
        </Navbar>
        <Outlet />
    </>

);

export default Layout;