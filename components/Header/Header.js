import React from 'react';
import styles from './Header.module.css'
import logo from "public/Doggo_light.png" //http://localhost:3000/rules/Doggo_light.png
import Link from "next/link";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import DropdownBtn from "../DropdownBtn";
import MenuItem from "@material-ui/core/MenuItem";
import DoggoBtn from "../DoggoBtn/DoggoBtn";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as _ from "underscore";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        justifyContent: "space-around",
        padding: "10px 0"
    },
    link: {
        color: "white",
        padding: "16px 38px",
        width: "100%",
        height: "100%"
    },
    menuItem: {
        padding: "0!important",
        textTransform: "uppercase",
        color: "white",
        '&:hover': {
            backgroundColor: '#39394e'
        }
    },
    title: {
        flexGrow: 1,
    },
}));

const WideToolbar = ({ classes, children }) => {
    return (
        <Toolbar className={classes.toolbar}>
            {children}
        </Toolbar>
    )
}

const MobileToolbar = ({ classes, children }) => {
    const [first, rest] = [_.first(children), _.rest(children)];

    return (
        <Toolbar style={{ flexDirection: "column" }} className={classes.toolbar}>
            <Accordion style={{ backgroundColor: "transparent", boxShadow: "none", color: "white" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    {first}
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {rest}
                    </div>
                </AccordionDetails>
            </Accordion>
        </Toolbar>
    )
}
const Header = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');

    const content = [
        <Link key={1} href="/" className={classes.title} passHref>
            <Button>
                <img className={styles['Header-logo']} src={logo} alt="Логотип Doggo" />
            </Button>
        </Link>,
        <DropdownBtn buttonProps={{size:"large"}} key={2} text={'Послуги'}>
            <MenuItem className={classes.menuItem}>
                <Link href='/marketplace' passHref>
                    <a className={classes.link}>Вигул</a>
                </Link>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <Link href='/petAdoption' passHref>
                    <a className={classes.link}>Прихисти тварину</a>
                </Link>
            </MenuItem>
        </DropdownBtn>,
        <Link key={3} href='/job' passHref>
            <Button size={"large"} style={{ color: 'white' }}>Робота</Button>
        </Link>,
        <DropdownBtn buttonProps={{size:"large"}} key={4} text={'Інформація'}>
            <MenuItem className={classes.menuItem}>
                <Link href='/rules' passHref>
                    <a className={classes.link}>Правила вигулу</a>
                </Link>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
                <Link href='/dogwalkingZones' passHref>
                    <a className={classes.link}>Місця для вигулу</a>
                </Link>
            </MenuItem>
        </DropdownBtn>,
        // TODO
        // <Link key={5} href='/login' passHref>
        //     <DoggoBtn size={"large"}>Увійти</DoggoBtn>
        // </Link>
    ]
    return (
        <AppBar style={{ backgroundColor: "#2B2B3B" }} position="static">
            {matches ? <WideToolbar classes={classes}>{content}</WideToolbar> : <MobileToolbar classes={classes}>{content}</MobileToolbar>}
        </AppBar>
    );
}

export default Header;
