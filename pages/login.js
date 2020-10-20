import React, { useState } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Footer from '../components/Footer/Footer';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';
import { signInUser } from '../lib/authentication';
import styles from './styles/login.module.css';

const Login = () => {
    const [userJwt, setUserJwt] = useState('');
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
    const [credentialsValidated, setCredentialsValidated] = useState({ email: true, password: true });
    const [toast, setToast] = useState(null);

    const onInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUserCredentials({ ...userCredentials, [name]: value });

        {
            let regex = '';

            if (name === 'email') {
                regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            } else {
                regex = /.+/;
            }

            setCredentialsValidated({ ...credentialsValidated, [name]: regex.test(value) });
        }
    };
    const handleSignIn = async () => {
        if (userCredentials.email && credentialsValidated.email && credentialsValidated.password) {
            const response = await signInUser(userCredentials);
            if (response.message && response.message.includes('400')) {
            } else {
                setUserJwt(response.data.jwt);
            }
        }
    };

    return (
        <div>
            <NextSeo canonical="https://doggo.co.ua/login" title="Doggo | Авторизация" />
            <div className={styles["Login"]}>
                <Card className={styles["Login-container"]}>
                    <Grid container>
                        <Grid item md={6}>
                            <Typography variant="h5">
                                Вхід
                            </Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Link href="/registration">
                                <a href="/registration" className="text-reset font-weight-light h5">Реєстрація</a>
                            </Link>
                        </Grid>
                    </Grid>
                    <CardContent>
                        <form noValidate autoComplete="off">
                            <TextField label="Пошта" type="text" />
                            <TextField label="Пароль" type="password" />
                        </form>
                        <DoggoBtn size="lg" onClick={handleSignIn}>
                            Увійти
                        </DoggoBtn>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
