import React, { useState, useEffect } from "react";
import "./PropertyDetails.css";
import { useParams } from "react-router-dom";
import MapView from "../MapView/MapView";

const apiUrl = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000" : "https://django-estate-agent-dot-gym-pro-410823.uc.r.appspot.com";

const PropertyDetails = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`${apiUrl}/uk-estate-property/items/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        let data = await response.json();

        setItemData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!itemData) {
    return (
      <div>No property details available. Please go back to the listing.</div>
    );
  }

  let {
    title,
    address,
    price,
    description,
    images,
    key_features,
    right_image_url,
  } = itemData;

  console.log("key_features before split:", key_features);

  let parsedFeatures;

  if (key_features && key_features !== "[]") {
    parsedFeatures = key_features ? key_features.split(",") : [];
  } else {
    parsedFeatures = '';
  }

  console.log("parsedFeatures after split:", parsedFeatures);

  let parsedImages;

  if (!right_image_url.startsWith("Right image URL")) {
    parsedImages = JSON.parse(right_image_url);
  } else {
    parsedImages = images.split(",");
    parsedImages[0] = parsedImages[0].replace(/^"|"$/, "");
    parsedImages[parsedImages.length - 1] = parsedImages[
      parsedImages.length - 1
    ].replace(/^"|"$/, "");
  }

  function setMapFunc() {
    setMap(!map);
  }

  console.log("type of parsed features", typeof parsedFeatures);

  return (
    <>
      <div className="property-details-container">
        <header className="property-header">
          <h1 className="property-title">{title}</h1>
          <p className="property-address">{address}</p>
          <p className="property-price">{price}</p>
        </header>

        <div className="property-gallery">
          {parsedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property view ${index + 1}`}
              className="property-image"
            />
          ))}
        </div>

        <section className="property-info">
          <h2>Property Description</h2>
          <p>{description}</p>
        </section>

        {parsedFeatures.length > 0 && (
          <section className="property-features">
            <h2>Features</h2>
            <ul>
              {parsedFeatures.map((feature, index) =>
                feature.trim() ? (
                  <li key={index}>{feature.replace(/^"|"$/g, "")}</li>
                ) : null
              )}
            </ul>
          </section>
        )}
      </div>

      <div className="div-button-map">
        <button className="button-map" onClick={setMapFunc}>
          {map ? "Hide Map" : "Show Map"}
        </button>
      </div>

      {map ? (
        itemData ? (
          <MapView property={itemData} />
        ) : (
          <div>Loading map... </div>
        )
      ) : null}
    </>
  );
};

export default PropertyDetails;
