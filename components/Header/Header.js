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
                                <span className="text-light">Услуги</span>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className={styles['Header-dropdown']}>
                                <MDBDropdownItem href="#!" ><Link href={"/marketplace"}><span className="text-light">Выгул</span></Link></MDBDropdownItem>
                                <MDBDropdownItem href="#!" ><Link href={"/dogExchange"}><span className="text-light">Приюти питомца</span></Link></MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                    <MDBNavItem>
                        <Link href={"/job"}>
                            <span className="nav-link text-light" style={{ cursor: 'pointer' }}>Работа</span>
                        </Link>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <span className="text-light">Информация</span>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className={styles['Header-dropdown']}>
                                <MDBDropdownItem href="#!" ><Link href={"/dogwalkingZones"}><span className="text-light">Места для выгула</span></Link></MDBDropdownItem>
                                <MDBDropdownItem href="#!" ><Link href={"/rules"}><span className="text-light">Правила выгула</span></Link></MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
}

export default Header;
