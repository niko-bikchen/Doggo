import React from 'react';
import { useState, useCallback } from 'react';

import styles from './Header.module.css';

import Link from "next/link";

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
    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = useCallback(
        () => {
            setIsOpen(!isOpen)
        },
        [isOpen],
    );

    return (
        <MDBNavbar className={styles.Header} dark expand="md">
            <MDBNavbarBrand className={styles['Header-brand']}>
                <Link href={"/"}>
                    <img className={styles['Header-logo']} src="Doggo_light.png" />
                </Link>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" className={styles['Header-collapse']} isOpen={isOpen} navbar>
                <MDBNavbarNav>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <span className="text-light">Послуги</span>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className={styles['Header-dropdown']}>
                                <MDBDropdownItem href="#!" className="text-light">Вигул</MDBDropdownItem>
                                <MDBDropdownItem href="#!" className="text-light">Обмін тварин</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                    <MDBNavItem>
                        <span className="nav-link text-light">Робота</span>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <span className="text-light">Інформація</span>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className={styles['Header-dropdown']}>
                                <MDBDropdownItem href="#!" ><Link href={"/rules"}><span className="text-light">Зони для вигулу</span></Link></MDBDropdownItem>
                                <MDBDropdownItem href="#!" ><Link href={"/rules"}><span className="text-light">Правила вигулу</span></Link></MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
}

export default Header;
