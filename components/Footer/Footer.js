import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import style from './Footer.module.css';
import { Button } from "@material-ui/core";
export const LIGHT_THEME = "light"
const Footer = ({ backgroundColor = "transparent", theme = LIGHT_THEME }) => {
    const buttonTextColor = theme === LIGHT_THEME ? "#434a54" : "white";

    return (
        <footer className={style["Footer"]} style={{ backgroundColor }}>
            <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item xs={12} md={4}>
                    <Grid container justify="center" alignItems="center" style={{ color: theme === LIGHT_THEME ? 'white' : '#2B2B3B' }}>
                        Copyright © 2020 DOGGO. All rights reserved.
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box textAlign="center">
                        <img src={theme === LIGHT_THEME ? "Doggo_light.png" : "Doggo_dark.png"} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* <Grid container justify="space-around" alignItems="center">
                        <Button style={{ color: buttonTextColor }} >Потрібна допомога?</Button>
                        <Button style={{ color: buttonTextColor }} >Захист Даних</Button>
                        <Button style={{ color: buttonTextColor }} >Умови Обслуговування</Button>
                    </Grid> */}
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
