import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Footer from '../components/Footer/Footer';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';
import { signUpUser } from '../lib/authentication';
import styles from './styles/registration.module.css';

const Registration = () => {
    return (
        <div>
            <div className={styles["Registration"]}>
                <Card className={styles["Registration-container"]}>
                    <div>
                        <span>Реєстрація</span>
                        <p>
                            Ваша роль?
                        </p>
                    </div>
                    <CardContent>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    )
};

export default Registration;