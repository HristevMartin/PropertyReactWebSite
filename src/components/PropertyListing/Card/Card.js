import "./Card.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Card({ item }) {
  // Placeholder image path
  const placeholderImage = 'path_to_default_placeholder_image.jpg'; // Update this path

  const [imageSrc, setImageSrc] = useState(
    item.right_image_url && item.right_image_url[0]
      ? item.right_image_url[0]
      : item.images.split(",")[0].replace(/^"|"$/, "")
  );

  const handleImageError = () => {
    const imageList = item.right_image_url.map(img => img.replace(/^"|"$/, "").trim());
    const fallbackImage = imageList.length > 1 ? imageList[1] : placeholderImage;
    setImageSrc(fallbackImage); // Set the fallback image or placeholder
  };

  const numericPricePerWeek = parseFloat(item.price_per_week.replace(/,/g, ''));
  console.log('numericPricePerWeek', numericPricePerWeek)

  // Format the price with thousand separators
  const formattedPricePerWeek = new Intl.NumberFormat('en-GB').format(numericPricePerWeek);
  // Determine the text to display based on the numeric value
  const priceText = numericPricePerWeek <= 3000
    ? `${formattedPricePerWeek} £ Per month`
    : `${formattedPricePerWeek} £`;

  if (!item){
    return <div>No items</div>
  }

  return (
    <div className="container-card-container">
      <img
        className="container-card-image"
        src={imageSrc}
        onError={handleImageError}
        alt={`View of ${item.address}`}
      />
      <div className="container-card-text">
        <p>{priceText}</p>
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
