import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import style from './Footer.module.css';

const Footer = () => {
    return (
        <div className={style["Footer"]}>
            <MDBContainer className="align-items-center">
                <MDBRow>
                    <MDBCol lg="4" className="text-center text-lg-left text-sm-center">
                        <span className="text-muted">
                            Copyright © 2020 DOGGO. All rights reserved.
                        </span>
                    </MDBCol>
                    <MDBCol lg="4" className="text-center">
                        <img src="Doggo_light.png" />
                    </MDBCol>
                    <MDBCol lg="4"></MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Footer;