import React from 'react';
import styles from './Header.module.css'
import {useState, useCallback} from 'react';
import Link from "next/link";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
                        <Link href='/marketplace'  passHref>
                            <a className={classes.link}>Приюти питомца</a>
                        </Link>
                    </MenuItem>
                </DropdownBtn>
                <Link  href='/job'  passHref>
                    <Button style={{color:'white'}}>работа</Button>
                </Link>
                <DropdownBtn text={'Информация'}>
                    <MenuItem className={classes.menuItem}>
                        <Link href='/rules' passHref>
                            <a className={classes.link}>Правила выгула</a>
                        </Link>
                    </MenuItem>
                    <MenuItem className={classes.menuItem}>
                        <Link href='/dogwalkingZones'  passHref>
                            <a className={classes.link}>Места для выгула</a>
                        </Link>
                    </MenuItem>
                </DropdownBtn>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
