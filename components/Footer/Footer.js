import React from 'react';
import Grid from '@material-ui/core/Grid';

import style from './Footer.module.css';

const Footer = () => {
    return (
        <div className={style["Footer"]}>
            <Grid container spacing={0}>
                <Grid item md={4}>
                    Copyright © 2020 DOGGO. All rights reserved.
                </Grid>
                <Grid item md={4}>
                    <img src="Doggo_light.png" />
                </Grid>
                <Grid item md={4}></Grid>
            </Grid>
        </div>
    );
};

export default Footer;
