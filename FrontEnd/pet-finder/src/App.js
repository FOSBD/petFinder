import "./App.css";
import Map, {
  Marker,
  FullscreenControl,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <Map
      initialViewState={{
        longitude: -9.13549,
        latitude: 38.7071,
        zoom: 12,
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker longitude={-9.13549} latitude={38.7071} color="blue" />
      <FullscreenControl />
      <NavigationControl />
    </Map>
  );
}

export default App;
