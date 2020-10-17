import React from 'react';
import { useState, useCallback } from 'react';
import Link from "next/link";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBBtn
} from "mdbreact";

import styles from './Header.module.css';

const LinkBtn = React.forwardRef(({ onClick, href, children }, ref) => {
    return (
        <div ref={ref}>
            <MDBBtn size={"lg"} className={styles["A"]} onClick={onClick}>{children}</MDBBtn>
            <a href={href} style={{ height: '0', width: '0' }}></a>
        </div>
    )
});
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
                <Link href="/" passHref>
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
                                <Link href="/marketplace" passHref><LinkBtn>Выгул</LinkBtn></Link>
                                <Link href="/petAdoption" passHref><LinkBtn>Приюти питомца</LinkBtn></Link>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                    <MDBNavItem>
                        <Link href="/job" passHref>
                            <span className="nav-link text-light" style={{ cursor: 'pointer' }}>
                                Работа
                                <a href="/job" style={{ height: '0', width: '0' }}></a>
                            </span>
                        </Link>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                                <span className="text-light">Информация</span>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className={styles['Header-dropdown']}>
                                <Link href="/rules" passHref><LinkBtn>Правила выгула</LinkBtn></Link>
                                <Link href="/dogwalkingZones" passHref><LinkBtn>Места для выгула</LinkBtn></Link>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                    <MDBNavItem>
                        <Link href="/login" passHref>
                            <span className={styles["Header-loginBtn"] + " nav-link" + " text-light"}>
                                Войти
                                <a href="/login" style={{ height: '0', width: '0' }}></a>
                            </span>
                        </Link>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
}

export default Header;
