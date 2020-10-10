import React from 'react';

import './Header.module.css';

import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBFormInline,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from "mdbreact";

const Header = () => {
    return (
        <MDBNavbar color="#2B2B3B">
            <MDBNavbarBrand>
                <img className="Header-logo" src="Doggo_light.png" />
            </MDBNavbarBrand>
            <MDBNavbarNav left></MDBNavbarNav>
            <MDBNavbarNav right></MDBNavbarNav>
        </MDBNavbar>
    );
}

export default Header;