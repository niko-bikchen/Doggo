import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput } from "mdbreact";
import Link from "next/link";
import { NextSeo } from "next-seo";

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
                <MDBCard className={styles["Login-container"]}>
                    <MDBCardTitle>
                        <MDBContainer>
                            <MDBRow className="mx-2 align-center align-items-center">
                                <MDBCol md="6" className="h3 text-center text-md-left">
                                    Вхід
                                </MDBCol>
                                <MDBCol md="6" className="text-center text-md-right text-muted">
                                    <Link href="/registration">
                                        <a href="/registration" className="text-reset font-weight-light h5">Реєстрація</a>
                                    </Link>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBCardTitle>
                    <MDBCardBody>
                        <MDBContainer>
                            <MDBInput label="Пошта" icon="envelope" />
                            <MDBInput label="Пароль" icon="asterisk" type="password" />
                        </MDBContainer>
                        <div className="text-center mt-5">
                            <DoggoBtn size="lg" onClick={handleSignIn}>
                                Увійти
                            </DoggoBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
