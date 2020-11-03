import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const defaultContainerStyle = {
    width: '400px',
    height: '400px'
};

const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

const libraries = ["places","drawing"];
const LS = ({children})=>{
    if(typeof window !== "undefined" && window.google != undefined){
        console.log(window.google.maps)
        return children
    }
    return(
        <LoadScript
            googleMapsApiKey="AIzaSyDmlK3mVog-Im6jxzFvEScDyx8Jk2MqyZY"
            libraries={libraries}
        >
            {children}
        </LoadScript>
    )
}
const Map = ({ containerStyle, center, children, zoom = 16, options }) => {
    return (
        <LS>
            <GoogleMap
                mapContainerStyle={{ ...defaultContainerStyle, ...containerStyle }}
                center={{ ...defaultCenter, ...center }}
                zoom={zoom}
                options={options}
            >
                { /* Child components, such as markers, info windows, etc. */}
                {children}
            </GoogleMap>
        </LS>

    )
}

export default React.memo(Map)
