import React from 'react';

import styles from './Header.module.css';

import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavbarToggler,
    MDBCollapse,
    MDBFormInline,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBBtn
} from "mdbreact";

const Header = () => {
    return (
        <MDBNavbar className={styles.Header} dark expand="md">
            <MDBNavbarBrand className={styles['Header-brand']}>
                <img className={styles['Header-logo']} src="Doggo_light.png" />
            </MDBNavbarBrand>
            <MDBNavbarNav left>
                <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                            <div className="d-none d-md-inline">Послуги</div>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem href="#!">Вигул</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Обмін тварин</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem>
                    <span className="nav-link">Робота</span>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                            <div className="d-none d-md-inline">Інформація</div>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem href="#!">Зони для вигулу</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Правила вигулу собак</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right></MDBNavbarNav>
        </MDBNavbar>
    );
}

export default Header;