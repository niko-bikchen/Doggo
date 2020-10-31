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

const libraries = ["places"];

function MyComponent({ containerStyle, center, children, zoom = 16, options }) {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDmlK3mVog-Im6jxzFvEScDyx8Jk2MqyZY"
            libraries={libraries}
        >
            <GoogleMap
                mapContainerStyle={{ ...defaultContainerStyle, ...containerStyle }}
                center={{ ...defaultCenter, ...center }}
                zoom={zoom}
                options={options}
            >
                { /* Child components, such as markers, info windows, etc. */}
                {children}
            </GoogleMap>
        </LoadScript >
    )
}

export default React.memo(MyComponent)
