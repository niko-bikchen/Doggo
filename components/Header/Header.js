import React from 'react';
import styles from './Header.module.css'
import {useState, useCallback} from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Link from "next/link";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import DropdownBtn from "../DropdownBtn";
import MenuItem from "@material-ui/core/MenuItem";
import DoggoBtn from "../DoggoBtn/DoggoBtn";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import * as _ from "underscore";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";

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

const WideToolbar = ({classes,children}) => {
    return (
        <Toolbar className={classes.toolbar}>
            {children}
        </Toolbar>
    )
}

const MobileToolbar = ({classes,children}) => {
    const [open,setOpen] = useState(false)
    const [first,rest] = [_.first(children),_.rest(children)]
    return (
        <Toolbar style={{flexDirection:"column"}} className={classes.toolbar}>
            <Accordion style={{backgroundColor:"transparent",boxShadow:"none", color:"white"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{color:"white"}} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    {/*<Typography className={classes.heading}>Accordion 1</Typography>*/}
                    {first}
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {rest}
                    </div>

                    {/*<Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>*/}
                </AccordionDetails>
            </Accordion>
           {/* <Box display="flex" width="100%" justifyContent="space-around" >
                {first}
                <IconButton onClick={()=>{setOpen(!open)}} aria-label="delete" className={classes.margin} size="small">
                    <KeyboardArrowDownIcon style={{color:"white"}} fontSize="inherit" />
                </IconButton>
            </Box>*/}

        </Toolbar>
    )
}
const Header = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    console.log(classes)
    const content = [
        <Link key={1} href="/" className={classes.title} passHref>
            <Button>
                <img className={styles['Header-logo']} src="Doggo_light.png"/>
            </Button>
        </Link>,
        <DropdownBtn key={2} text={'Услуги'}>
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
        </DropdownBtn>,
        <Link key={3}  href='/job'  passHref>
            <Button style={{color:'white'}}>работа</Button>
        </Link>,
        <DropdownBtn key={4} text={'Информация'}>
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
        </DropdownBtn>,
        <Link key={5}  href='/login'  passHref>
            <DoggoBtn>Войти</DoggoBtn>
        </Link>
    ]
    return (
        <AppBar style={{backgroundColor: "#2B2B3B"}} position="static">
            {matches?<WideToolbar classes={classes}>{content}</WideToolbar>:<MobileToolbar classes={classes}>{content}</MobileToolbar> }
        </AppBar>
    );
}

export default Header;
