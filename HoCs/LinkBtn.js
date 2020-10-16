import React, {useEffect} from "react";
import {MDBBtn} from "mdbreact";
const LinkBtn = React.forwardRef(({onClick,href,children},ref)=>{
    return <MDBBtn onClick={onClick} ref={ref}>{children}</MDBBtn>
});


export default LinkBtn;
