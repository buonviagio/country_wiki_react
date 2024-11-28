import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapListProps = {
  country: string;
};

const MapList = ({ country }: MapListProps) => {
  const [capitalCoordinates, setCapitalCoordinates] = useState<number[] | null>(
    null
  );

  const fetchCapitalData = async () => {
    try {
      // retrieve data based on the name of the country
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
      );
      const data = await response.json();

      const lat = data[0].latlng[0];
      const lon = data[0].latlng[1];

      setCapitalCoordinates([lat, lon]);
    } catch (error) {
      console.error("We can not recieve data from restcountries", error);
    }
  };

  if (country) {
    fetchCapitalData();
  }

  if (capitalCoordinates) {
    return (
      <MapContainer
        //TODO Fix center
        center={capitalCoordinates}
        zoom={5}
        style={{ width: "100%", height: "300px", marginTop: "50px" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
        <Marker position={capitalCoordinates}>
          <Popup>{country}</Popup>
        </Marker>
      </MapContainer>
    );
  }
};

export default MapList;
