import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput } from "mdbreact";
import { NextSeo } from "next-seo";

import Footer from '../components/Footer/Footer';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';
import { signUpUser } from '../lib/authentication';
import styles from './styles/registration.module.css';

const Registration = () => {
    return (
        <div>
            <div className={styles["Registration"]}>
                <MDBCard className={styles["Registration-container"]}>
                    <MDBCardTitle className="text-center">
                        <span className="h3">Реєстрація</span>
                        <p className="mt-2 text-center text-muted h5 font-weight-light">
                            Ваша роль?
                        </p>
                    </MDBCardTitle>
                    <MDBCardBody>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <Footer />
        </div>
    )
};

export default Registration;