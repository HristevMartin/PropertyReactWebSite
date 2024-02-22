import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import "./MapView.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};


const MapComponent = ({ property }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const center = {
    lat: property.lattitude,
    lng: property.longtitude,
  };

  const handleMouseOver = () => {
    setSelectedProperty(property);
  };

  const handleMouseOut = () => {
    setSelectedProperty(null);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCwJaT7AU5agi_Ul_zwCWsQ-U5CYvZlLPA">
      <GoogleMap
        mapContainerClassName="map-view-container"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <Marker
          position={center}
          onMouseOver={() => setShowInfoWindow(true)}
          onMouseOut={() => setShowInfoWindow(false)}
        >
          {showInfoWindow && (
            <InfoWindow
              position={{
                lat: selectedProperty.lattitude,
                lng: selectedProperty.longtitude,
              }}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div className="info-window-content">
                <h1 className="info-window-title">{selectedProperty.title}</h1>
                <p className="info-window-price">
                  Price: {selectedProperty.price}
                </p>
                {/* Add an image if available */}
                {selectedProperty.images &&
                  selectedProperty.images.length > 0 && (
                    <img
                      src={selectedProperty.images[0]}
                      alt="Property"
                      style={{ width: "100%", marginTop: "5px" }} // Inline style for demo purposes, you can create a CSS class for this
                    />
                  )}
              </div>
            </InfoWindow>
          )}
        </Marker>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(MapComponent);
