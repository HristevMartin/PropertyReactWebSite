import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card/Card";
import "./PropertyListing.css";
import { useAuth } from "../../context/AuthContext";
import fetchWithToken from "../../services/apiServices";
import MapView from "../MapView/MapView";

const PropertyListing = () => {
  const [sample, setSample] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState("low");
  const [searchArea, setSearchArea] = useState("");
  const [area, sortArea] = useState("");
  const [uniqueAreas, setUniqueAreas] = useState([]);

  const [viewMode, setViewMode] = useState("list"); 

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "map" : "list"));
  };

  const handleAreaChange = (event) => {
    setSearchArea(event.target.value);
  };

  const { user, logout, refreshToken } = useAuth();

  const sortPropertiesByPrice = useCallback(
    (properties) => {
      return properties.sort((a, b) => {
        const priceA = parseFloat(a.price_per_week);
        const priceB = parseFloat(b.price_per_week);

        return sortOrder === "low" ? priceA - priceB : priceB - priceA;
      });
    },
    [sortOrder]
  );

  const fetchUniqueAreas = useCallback(async () => {
    const url = `http://127.0.0.1:8000/uk-estate-property/unique-areas/`;

    const response = await fetchWithToken(
      url,
      user.access_token,
      refreshToken,
      logout
    );

    if (response.ok) {
      const json = await response.json();
      setUniqueAreas(json);
    } else {
      console.error("Failed to fetch unique areas");
    }
  }, [user.access_token, refreshToken, logout]);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(
        `http://127.0.0.1:8000/uk-estate-property/property-pagination/`
      );
      const params = {
        page: currentPage,
        page_size: pageSize,
        sort: sortOrder === "low" ? "price_per_week" : "-price_per_week",
      };

      if (searchArea.trim() !== "") {
        params.area = searchArea.trim();
      }

      if (area.trim() !== "") {
        params.sortArea = area.trim();
      }
      console.log("params", params);

      url.search = new URLSearchParams(params).toString();

      const response = await fetchWithToken(
        url.toString(),
        user.access_token,
        refreshToken,
        logout
      );

      if (response.ok) {
        const json = await response.json();
        const sortedData = sortPropertiesByPrice(json.data || []);
        setSample(sortedData);
        console.log("json paginated response", json);
        setTotalPages(Math.ceil(json.total_items / pageSize));
      } else {
        console.error("Failed to fetch");
      }
    };

    if (user.access_token) {
      fetchData();
    }
  }, [
    user.access_token,
    currentPage,
    area,
    sortOrder,
    searchArea,
    pageSize,
    refreshToken,
    logout,
    sortPropertiesByPrice,
  ]);

  useEffect(() => {
    if (user.access_token) {
      fetchUniqueAreas();
    }
  }, [fetchUniqueAreas]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortArea = (event) => {
    console.log("event", event.target.value);
    sortArea(event.target.value);
  };

  return (
    <div className="parent-search-container">
      <div className="search-container">
        <div>
          <label>Search By Area</label>
          <input value={searchArea} onChange={handleAreaChange} type="text" />
        </div>

        <div>
          <label>Sort by Price</label>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
        <div>
          <label>Sort by Area</label>
          <select value={area} onChange={handleSortArea}>
            <option value="">Select All Areas</option>
            {uniqueAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="container-card">
        {sample.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{marginTop: '10px'}}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <div  className="view-toggle">
        <button className="button-to-map" onClick={toggleViewMode}>
          {viewMode === "list" ? "Switch to Map" : "Collapse Map"}
        </button>
      </div>

      <div className="ss">
        {viewMode === "list" ? null
         : (
          <MapView properties={sample} />
        )}
      </div>
      
    </div>
  );
};

export default PropertyListing;
