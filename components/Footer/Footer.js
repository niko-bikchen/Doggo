import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import style from './Footer.module.css';

const Footer = () => {
    return (
        <div className={style["Footer"]}>
            <MDBContainer className="align-items-center">
                <MDBRow>
                    <MDBCol md="4">
                        <span className="text-muted">
                            Copyright © 2020 DOGGO. All rights reserved.
                        </span>
                    </MDBCol>
                    <MDBCol md="4" className="text-center">
                        <img src="Doggo_light.png" />
                    </MDBCol>
                    <MDBCol md="4"></MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Footer;