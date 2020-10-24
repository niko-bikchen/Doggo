import React, { useState } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Footer from '../components/Footer/Footer';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';
import DoggoInput from '../components/DoggoInput';
import { signInUser } from '../lib/authentication';
import styles from './styles/login.module.css';
import { ACTION_TYPES, ACTIONS } from "../lib/store";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
            margin: 0
        }
    }
}));

const Login = ({ setJwt }) => {
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
    const [credentialsValidated, setCredentialsValidated] = useState({ email: true, password: true });
    const [toast, setToast] = useState(null);
    const classes = useStyles();

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
                setJwt(response.data.jwt)
            }
        } else {
            setCredentialsValidated({
                email: false,
                password: false
            });
        }
    };

    return (
        <div>
            <NextSeo canonical="https://doggo.co.ua/login" title="Doggo | Авторизация" />
            <div className={styles["Login"]}>
                <Card className={styles["Login-container"]}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Box className={classes.root} textAlign="right" mr={2}>
                                <Typography variant="h5">
                                    Вхід
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.root}>
                            <Link href="/registration" passHref>
                                <Button>
                                    <Typography variant="body1">
                                        Реєстрація
                                    </Typography>
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <CardContent>
                        <form autoComplete="off">
                            <Grid container spacing={5} justify="center">
                                <Grid item xs={12}>
                                    <DoggoInput helperText={!credentialsValidated.email && "Пошта не відповідає стандартному формату"} error={!credentialsValidated.email} onChange={onInputChange} name="email" fullWidth variant="outlined" label="Пошта" type="text" InputProps={{ startAdornment: (<InputAdornment position="start"><MailOutlineIcon /></InputAdornment>) }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <DoggoInput helperText={!credentialsValidated.password && "Поле не має бути порожнім"} error={!credentialsValidated.password} onChange={onInputChange} name="password" fullWidth variant="outlined" label="Пароль" type="password" InputProps={{ startAdornment: (<InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>) }} />
                                </Grid>
                            </Grid>
                        </form>
                        <Box textAlign="center" mt={3}>
                            <DoggoBtn size="large" onClick={handleSignIn}>
                                Увійти
                            </DoggoBtn>
                        </Box>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};
const mapDispatchToProps = dispatch => {
    return {
        setJwt: jwt => dispatch(ACTIONS[ACTION_TYPES.SET_JWT]({ jwt }))
    }
}
export default connect(null, mapDispatchToProps)(Login);
