import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import style from './Footer.module.css';

const Footer = () => {
    return (
        <div className={style["Footer"]}>
            <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item xs={12} md={4}>
                    <Grid container justify="center" alignItems="center">
                        Copyright © 2020 DOGGO. All rights reserved.
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box textAlign="center">
                        <img src="Doggo_light.png" />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
        </div>
    );
};

export default Footer;
