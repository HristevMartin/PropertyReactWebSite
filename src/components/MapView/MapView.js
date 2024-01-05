import "./MapView.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapView = ({ properties }) => {
  return (
    <div className="parent-map-view-container">
      <div>
        <h1 className="map-view-title">Map View</h1>
      </div>

      <MapContainer
        center={[51.505, -0.09]}
        zoom={15}
        className="map-view-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.lattitude, property.longtitude]}
          >
            <Popup>
              <div className="leaflet-popup-content">
                <img
                  src={property.right_image_url ? property.right_image_url[0] : 'default image'}
                  alt={property.title}
                  className="property-popup-image"
                />
                <div className="property-popup-price">
                  Price: {property.price}
                </div>
                <div>
                  <Link to={`/item-property-detail/${property.id}`}>
                    <p className="view-details">View Details</p>
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

    </div>
  );
};

export default MapView;
