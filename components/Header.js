import React from 'react';

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
        <MDBNavbar className="Header">
            <MDBNavbarBrand>
                <img className="Header-logo" src="Doggo_light.png" />
            </MDBNavbarBrand>
        </MDBNavbar>
    );
}

export default Header;