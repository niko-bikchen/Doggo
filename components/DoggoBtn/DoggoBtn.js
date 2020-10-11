import React from 'react';
import { MDBBtn } from 'mdbreact';

import styles from './DoggoBtn.module.css';

const DoggoBtn = (props) => {
    return (
        <MDBBtn color="amber" className={styles["DoggoBtn"]} {...props}></MDBBtn>
    )
}

export default DoggoBtn;