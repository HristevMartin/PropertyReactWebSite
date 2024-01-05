import "./Card.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Card({ item }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    // If there's an image error, don't render the card
    return null;
  }

  return (
    <div className="container-card-container">
      {item.right_image_url[0] && (
        <img
          className="container-card-image"
          src={item.right_image_url[0]}
          onError={handleImageError}
        />
      )}

      <div className="container-card-text">
        <p>{item.price_per_week}£ a Week </p>
        {/* <p>{item.price_per_month} a Month </p> */}
        <p>{item.address}</p>

        <Link
          to={`/item-property-detail/${item.id}`}
          className="container-card-button"
          role="button"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default Card;
