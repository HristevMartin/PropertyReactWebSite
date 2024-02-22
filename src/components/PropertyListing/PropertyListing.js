import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card/Card";
import "./PropertyListing.css";
import { useAuth } from "../../context/AuthContext";
import fetchWithToken from "../../services/apiServices";
import MapView from "../MapView/MapView";

const PropertyListing = () => {
  //load the data
  const [sample, setSample] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState("low");
  const [searchArea, setSearchArea] = useState("");
  const [area, sortArea] = useState("");
  const [uniqueAreas, setUniqueAreas] = useState([]);
  const [countries, setCountires] = useState([]);
  const [sortCountry, setSortCountry] = useState("all");
  const [price, setPrice] = useState([]);
  const [priceChange, setPriceChange] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [viewMode, setViewMode] = useState("list");

  const apiUrl = process.env.REACT_APP_API_URL;


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

  const fetchUniqueContries = useCallback(async () => {
    // define the url
    const url = new URL(
      `${apiUrl}/uk-estate-property/unique-country/`
    );

    if (searchArea.trim() !== "") {
      url.searchParams.append("searchArea", searchArea);
    }

    const resposne = await fetchWithToken(
      url,
      user.access_token,
      refreshToken,
      logout
    );

    if (resposne.ok) {
      const json = await resposne.json();
      setCountires(json);
    } else {
      console.error("Failed to fetch unique countries");
    }
  }, [user.access_token, refreshToken, logout, searchArea]);

  const fetchUniqueAreas = useCallback(
    async (selectedCountry) => {
      const url = new URL(
        `${apiUrl}/uk-estate-property/unique-areas/`
      );

      if (sortCountry && sortCountry !== "all") {
        url.searchParams.append("country", sortCountry);
      }

      if (searchArea.trim() !== "") {
        console.log("searchArea", searchArea);
        url.searchParams.append("searchArea", searchArea);
      }

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
    },
    [user.access_token, refreshToken, logout, sortCountry, searchArea]
  );

  console.log("apiUrl", apiUrl);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url = new URL(
        `${apiUrl}/uk-estate-property/property-pagination/`
      );
      const params = {
        page: currentPage,
        page_size: pageSize,
        sort: sortOrder === "low" ? "price_per_week" : "-price_per_week",
        country: sortCountry,
      };

      if (searchArea.trim() !== "") {
        params.area = searchArea.trim();
      }

      if (area.trim() !== "") {
        params.sortArea = area.trim();
      }

      if (priceChange.trim() !== "") {
        params.price = priceChange.trim();
      }

      url.search = new URLSearchParams(params).toString();

      const response = await fetchWithToken(
        url.toString(),
        user.access_token,
        refreshToken,
        logout
      );

      if (response.ok) {
        const json = await response.json();
        const sortedData = json.data;
        setSample(sortedData);

        setTotalPages(Math.ceil(json.total_items / pageSize));
        setIsLoading(false);
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
    sortCountry,
    searchArea,
    pageSize,
    priceChange,
    refreshToken,
    logout,
    sortPropertiesByPrice,
  ]);

  const fetchRequest = useCallback(async () => {
    const url = new URL(
      `${apiUrl}/uk-estate-property/price-range/`
    );

    if (searchArea.trim() !== "") {
      url.searchParams.append("searchArea", searchArea);
    }

    if (sortCountry && sortCountry !== "all") {
      url.searchParams.append("sortCountry", sortCountry);
    }

    const request = await fetch(url);

    if (!request.ok) {
      alert("Failed to fetch price range");
      throw new Error(`HTTP error! status: ${request.status}`);
    } else {
      let response = await request.json();
      setPrice(response);
    }
  }, [logout, user.access_token, searchArea, sortCountry]);

  useEffect(() => {
    if (user.access_token) {
      fetchUniqueAreas(sortCountry);
      fetchUniqueContries();
      fetchRequest();
    }
  }, [
    fetchUniqueAreas,
    fetchUniqueContries,
    fetchRequest,
    sortCountry,
    searchArea,
  ]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSortOrderCountry = (event) => {
    console.log("event", event.target.value);
    setSortCountry(event.target.value);
  };

  const handleSortArea = (event) => {
    console.log("event", event.target.value);
    sortArea(event.target.value);
  };

  // chat bot

  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  const getMessagesFromLocalStorage = () => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  };

  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState(getMessagesFromLocalStorage());

  useEffect(() => {
    saveMessagesToLocalStorage(messages);
  }, [messages]);

  const [chatBot, setChatBot] = useState(false);

  const openChatBot = () => {
    setChatBot((prev) => !prev);
  };

  const sendRequestToApi = async () => {
    let payloadData = JSON.stringify({
      message: userMessage,
      user_id: user.id,
    });

    console.log("send request to api");

    const request = await fetch(
      `${apiUrl}/uk-estate-property/chatbot/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payloadData,
      }
    );

    if (!request.ok) {
      alert("Failed to send message");
      throw new Error(`HTTP error! status: ${request.status}`);
    }

    let response = await request.json();

    setMessages((e) => [
      ...e,
      { text: response[0].reply, sender: "user" },
      { text: response[1].bot_reply, sender: "bot" },
    ]);
    setUserMessage("");
  };

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const closeChatBot = () => {
    setChatBot(false);
  };

  const handlePriceChange = (event) => {
    console.log("event of handlePriceChange", event.target.value);
    setPriceChange(event.target.value);
  };

  return (
    <div className="parent-search-container">
      <div className="search-container">
        <div>
          <label>Choose Country</label>
          <select value={sortCountry} onChange={handleSortOrderCountry}>
            <option value="all">Select All Countries</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

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
          <label>Price Range</label>
          <select value={priceChange} onChange={handlePriceChange}>
            <option value="">Select Price Range</option>
            {price.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-by-area">
          <label>Sort by Area</label>
          <select
            className="sort-by-area-options"
            value={area}
            onChange={handleSortArea}
          >
            <option value="">Select All Areas</option>
            {uniqueAreas.map((area) => (
              <option className="sort-by-area-values" key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* button for dialogflow agent */}
      <div>
        <button className="chatbot-button" onClick={openChatBot}>
          ChatBot
        </button>
      </div>

      <div
        className="chatbot-container"
        style={{ display: chatBot ? "block" : "none" }}
      >
        <div onClick={closeChatBot} className="chatbot-header">
          <h1>ChatBot</h1>
          <span className="chatbot-close-btn">X</span>
        </div>

        <div className="chatbot-body">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <label className="message-text">{message.text}</label>
            </div>
          ))}
        </div>

        <div className="chatbot-footer">
          <input
            onChange={handleInputChange}
            type="text"
            value={userMessage}
            placeholder="Type a message..."
            className="chatbot-input"
          />
          <button onClick={sendRequestToApi} className="chatbot-send-btn">
            Send
          </button>
        </div>
      </div>

      {/* chatbot ends */}

      <div className="container-card">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : sample.length > 0 ? (
          sample.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <div className="no-results">
            <div>No results found.</div>
          </div>
        )}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ marginTop: "10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyListing;
