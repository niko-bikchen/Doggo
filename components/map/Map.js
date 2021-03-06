import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import LinearProgress from '@material-ui/core/LinearProgress';

const defaultContainerStyle = {
  width: "400px",
  height: "400px",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const libraries = ["places", "drawing"];
const API_KEY = "AIzaSyDmlK3mVog-Im6jxzFvEScDyx8Jk2MqyZY";
const Map = ({ containerStyle, center, children, zoom = 12, options }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    language: "uk",
    region: "UA",
    googleMapsApiKey: API_KEY,
    libraries,
  });
  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={{ ...defaultContainerStyle, ...containerStyle }}
      center={{ ...defaultCenter, ...center }}
      zoom={zoom}
      options={options}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {children}
    </GoogleMap>
  );
  return isLoaded ? (
    renderMap()
  ) : (
    <div>
      <p style={{ textAlign: "center" }}>Loading...</p>
    </div>
  );
};

export default React.memo(Map);
