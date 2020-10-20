import React from 'react';
import styles from './Header.module.css'
import {useState, useCallback} from 'react';
import Link from "next/link";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DropdownBtn from "../DropdownBtn";
import MenuItem from "@material-ui/core/MenuItem";


const LinkHack = React.forwardRef(({onClick, href, children}, ref) => {
    return (
        <div ref={ref}>
            <span onClick={onClick}>{children}</span>
            <a href={href} style={{height: '0', width: '0'}}></a>
        </div>
    )
});
const useStyles = makeStyles((theme) => ({
    toolbar: {
        justifyContent: "space-around"
    },
    link:{
        color:"white",
        padding: "16px 38px",
        width:"100%",
        height:"100%"
    },
    menuItem: {
        padding:"0!important",
        textTransform: "uppercase",
        /*,*/
        color: "white",
        '&:hover':{
            backgroundColor:'#39394e'
        }
    },
    title: {
        flexGrow: 1,
    },
}));
const Header = () => {
    const classes = useStyles();
    console.log(classes)
    const [isOpen, setIsOpen] = useState(false);
    const toggleCollapse = useCallback(
        () => {
            setIsOpen(!isOpen)
        },
        [isOpen],
    );

    return (
        <AppBar style={{backgroundColor: "#2B2B3B"}} position="static">
            <Toolbar className={classes.toolbar}>
                {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>*/}
                <Link href="/" className={classes.title} passHref>
                    <img className={styles['Header-logo']} src="Doggo_light.png"/>
                </Link>
                <DropdownBtn text={'Услуги'}>
                    <MenuItem className={classes.menuItem}>
                        <Link href='/marketplace' passHref>
                            <a className={classes.link}>Выгул</a>
                        </Link>
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                        <Link className={classes.link} href='/marketplace'  passHref>
                            <a className={classes.link}>Приюти питомца</a>
                        </Link>
                    </MenuItem>
                </DropdownBtn>
                {/* <Link href={}<LinkBtn></LinkBtn>*/}
            </Toolbar>
        </AppBar>
        /*<MDBNavbar className={styles.Header} dark expand="md">
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
        </MDBNavbar>*/
    );
}

export default Header;
