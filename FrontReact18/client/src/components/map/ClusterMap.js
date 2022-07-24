import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { useValue } from "../../context/ContextProvider";
import Geocoder from "../addPlace/addLocation/Geocoder";
import Supercluster from "supercluster";
import { getPlaces } from "../../actions/place";
import "./cluster.css";
import { Avatar, Paper, Tooltip } from "@mui/material";

import PopupPlace from './PopupPlace';

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = () => {
  const {
    state: {
      location: { lng, lat },
      places,
    },
    dispatch,
    mapRef,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    getPlaces(dispatch);
  }, []);

  useEffect(() => {
    const points = places.map((place) => ({
      type: "Feature",
      properties: {
        cluster: false,
        placeId: place._id,
        rating: place.rating,
        title: place.title,
        description: place.description,
        lng: place.lng,
        lat: place.lat,
        images: place.images,
        uPhoto: place.uPhoto,
        uName: place.uName,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(place.lng), parseFloat(place.lat)],
      },
    }));
    setPoints(points);
  }, [places]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <Box
      sx={{
        height: "86%",
        with: "100%",
        position: "relative",
      }}
    >
      <ReactMapGL
        initialViewState={{ latitude: 38.7071, longitude: -9.13549, zoom: 8 }}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        ref={mapRef}
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        {clusters.map((cluster) => {
          const { cluster: isCluster, point_count } = cluster.properties;
          const [longitude, latitude] = cluster.geometry.coordinates;
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (point_count / points.length) * 20}px`,
                    height: `${10 + (point_count / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const zoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom,
                      speed: 1,
                    });
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`place-${cluster.properties.placeId}`}
              longitude={longitude}
              latitude={latitude}
            >
              <Tooltip title={cluster.properties.uName}>
                <Avatar
                  src={cluster.properties.uPhoto}
                  component={Paper}
                  elevation={2}
                  onClick={() => setPopupInfo(cluster.properties)}
                />
              </Tooltip>
            </Marker>
          );
        })}

        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            maxWidth="auto"
            closeOnClick={false}
            focusAfterOpen={false}
            onClose={() => setPopupInfo(null)}
          >
            <PopupPlace {...{ popupInfo }} />
          </Popup>
        )}

        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="bottom-right"
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
