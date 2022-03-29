import React from "react";
import useGeolocation from "react-hook-geolocation";

const useLocation = () => {
  const location = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity,
  });

  return !location.error ? location : alert("Error: " + location.error.message);
};
export default useLocation;
