import React, {useEffect} from "react";
const withWwwRedirect = Component => props => {
    useEffect(()=>{
        if(location.host.startsWith("www")){
            location.replace(location.href.replace("www",''))
        }
    },[])
    return <Component {...props}/>
}

export default withWwwRedirect
