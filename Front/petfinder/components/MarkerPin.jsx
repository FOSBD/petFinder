import React from "react";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MarkerPin() {
  return <Marker longitude={-9.13549} latitude={38.7071} color="blue" />;
}

export default MarkerPin;
