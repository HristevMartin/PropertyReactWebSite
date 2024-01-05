import React, { useState, useEffect } from 'react';
import './PropertyDetails.css';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`http://127.0.0.1:8000/uk-estate-property/items/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch property details');
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
        return <div>No property details available. Please go back to the listing.</div>;
    }

    const { title, address, price, description, images, key_features, right_image_url } = itemData;

    
    const parsedFeatures = JSON.parse(key_features || '[]');

    const parsedImages = JSON.parse(right_image_url)

    return (
        <div className="property-details-container">
            <header className="property-header">
                <h1 className="property-title">{title}</h1>
                <p className="property-address">{address}</p>
                <p className="property-price">{price}</p>
            </header>
            
            <div className="property-gallery">
                {parsedImages.map((image, index) => (
                    <img key={index} src={image} alt={`Property view ${index + 1}`} className="property-image"/>
                ))}
            </div>

            <section className="property-info">
                <h2>Property Description</h2>
                <p>{description}</p>
            </section>

            <section className="property-features">
                <h2>Features</h2>
                <ul>
                    {parsedFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default PropertyDetails;
