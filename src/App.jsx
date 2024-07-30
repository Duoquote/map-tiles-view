import React, { useEffect } from "react";
import { Box } from "@mui/material";
import L from "leaflet";
import { MapContainer } from "react-leaflet/MapContainer"
import { TileLayer } from "react-leaflet/TileLayer"
import { useMap } from "react-leaflet/hooks"

const Tiles = () => {
  const map = useMap();

  useEffect(() => {
    const layer = new L.GridLayer();
    layer.createTile = (coords) => {
      const tile = L.DomUtil.create("div");
      tile.style.fontSize = "16pt";
      tile.style.fontWeight = "bold";
      tile.style.display = "flex";
      tile.style.alignItems = "center";
      tile.style.justifyContent = "center";
      tile.style.border = "1px solid black";
      tile.innerHTML = `Z:${coords.z}<br>X:${coords.x}<br>Y:${coords.y}`;
      return tile;
    };
    layer.addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, []);

  return null;
};

export default function App() {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[41, 29]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Tiles />
      </MapContainer>
    </Box>
  );
}
