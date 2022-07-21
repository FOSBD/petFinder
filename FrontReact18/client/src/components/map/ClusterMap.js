import { Box } from "@mui/system";
import React from "react";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import { useValue } from "../../context/ContextProvider";
import Geocoder from "../addPlace/addLocation/Geocoder";

const ClusterMap = () => {
  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue();
  return (
    <Box
      sx={{
        height: '80%',
        with: 'auto',
        position: "relative",
      }}
    >
      <ReactMapGL
        initialViewState={{ latitude: 38.7071, longitude: -9.13549, zoom: 8 }}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) =>
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: e.coords.longitude, lat: e.coords.latitude },
            })
          }
        />
        <Geocoder />
      </ReactMapGL>
    </Box>
  );
};

export default ClusterMap;
