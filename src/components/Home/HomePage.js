import React from "react";
import "./HomePage.css";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function HomePage() {
  const randomValue = Math.floor(Math.random() * 10000);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImagesLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <main>
      <section className="hero">
        <div className="myapp-carousel">
          <img
            onLoad={handleImagesLoad}
            src={`https://source.unsplash.com/1920x1080/?house,architecture&sig=${randomValue}`}
            alt="House 1"
          />
          <img
            onLoad={handleImagesLoad}
            src={`https://source.unsplash.com/1920x1080/?home,modern&sig=${
              randomValue + 1
            }`}
            alt="House 2"
          />
          <img
            onLoad={handleImagesLoad}
            src={`https://source.unsplash.com/1920x1080/?residence,luxury&sig=${
              randomValue + 2
            }`}
            alt="House 3"
          />
        </div>

        <div className="hero-content">
          <h2>Welcome to Estate Agent</h2>
          <p>Your trusted partner in finding your dream home.</p>
          <a href="/listings" className="myapp-btn">
            Browse Listings
          </a>
        </div>
      </section>
      {!imagesLoaded && <LoadingSpinner />}
    </main>
  );
}

export default HomePage;
