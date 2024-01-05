import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import fetchWithToken from '../../services/apiServices';
import MapView from '../MapView/MapView';


const PropertyMapPage = () => {
  const [sample, setSample] = useState([]);

  const { user, logout, refreshToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWithToken(
        "http://127.0.0.1:8000/uk-estate-property/property2",
        user.access_token,
        refreshToken,
        logout
      );

      if (response.ok) {
        const json = await response.json();
        setSample(json);
      } else {
        console.log("Failed to fetch");
      }
    };

    if (user.access_token) {
      fetchData();
    }
  }, [user.access_token, refreshToken, logout]);
  return <MapView properties={sample} />;
};

export default PropertyMapPage;
