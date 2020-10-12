import React from 'react';
import { MDBBtn } from 'mdbreact';


const DoggoBtn = (props) => {
    return (
        <MDBBtn color="amber" style={{borderRadius:"10px"}}{...props}></MDBBtn>
    )
}

export default DoggoBtn;
