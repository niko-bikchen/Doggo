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

function MyComponent({containerStyle,center,children,zoom=10}) {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDmlK3mVog-Im6jxzFvEScDyx8Jk2MqyZY"
        >
            <GoogleMap
                mapContainerStyle={{...defaultContainerStyle,...containerStyle}}
                center={{...defaultCenter,...center}}
                zoom={zoom}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                {children}
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(MyComponent)
