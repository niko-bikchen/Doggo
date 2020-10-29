import {useEffect} from "react";
import React from "react";
const withQuery = query => Component => props => {

    return <Component {...props}/>;
}

export default withQuery
