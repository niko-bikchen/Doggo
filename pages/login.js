import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Button } from 'primereact/button';

import styles from './styles/login.module.css';

const Login = () => {
    return (
        <div className={styles["Login"]}>
            <div className={styles["Login-container"]}>
                <MDBContainer>
                    <MDBRow className="mt-3 mx-2 align-center align-items-center">
                        <MDBCol md="6" className="h3">
                            Вход
                        </MDBCol>
                        <MDBCol md="6" className="text-right text-muted">
                            <Button label="Регистрация" className="p-button-secondary p-button-text p-0" />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
};

export default Login;