import {useEffect} from "react";
import React from "react";
const withHttpsRedirect = Component => props => {
    useEffect(()=>{
        if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
            location.replace(`https:${location.href.substring(location.protocol.length)}`);
        }
    },[])

    return <Component {...props}/>;
}

export default withHttpsRedirect
