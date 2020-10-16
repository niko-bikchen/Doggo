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
const LinkBtn = React.forwardRef(({onClick,href,children},ref)=>{
    return <div ref={ref}><MDBBtn size={"lg"} className={styles["A"]} onClick={onClick} >{children}</MDBBtn></div>
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
                                <Link href={"/marketplace"}><LinkBtn >Выгул</LinkBtn></Link>
                                <Link href={"/dogExchange"}><LinkBtn>Приюти питомца</LinkBtn></Link>
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
                                <div className={styles["A"]}>
                                    <Link href={"/dogwalkingZones"}  ><LinkBtn>Места для выгула</LinkBtn></Link>
                                </div>
                                <div className={styles["A"]}>
                                    <Link href={"/rules"}><LinkBtn>Правила выгула</LinkBtn></Link>
                                </div>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
}

export default Header;
