import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/newsapi.css";
import styled from "styled-components";

const WeatherBody = styled.body`
  font-family: "Poppins", sans-serif;
  color: var(--primary-text-color);
  font-weight: 500; // extra
`;

const UL = styled.ul`
  list-style: none;
`;

const API_KEY = "95e7ed848efd43b4862cad76f6710c03";
const url = "https://newsapi.org/v2/everything?q=";

const NewsAPI = () => {
  const [articles, setArticles] = useState([]);
  const [selectedNav, setSelectedNav] = useState("cricketworldcup");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNews(selectedNav);
  }, [selectedNav]);

  const fetchNews = async (query) => {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
  };

  const bindData = (data) => {
    setArticles(data);
  };

  const handleNavClick = (id) => {
    setSelectedNav(id);
    setSearchQuery("");
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      fetchNews(searchQuery);
      setSelectedNav(null);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  const toggleNav = () => {
    const navLinks = document.querySelector(".nav-links ul");
    navLinks.classList.toggle("show");

    const searchLinks = document.querySelector(".search-bar");
    searchLinks.classList.toggle("show");
  };

  return (
    <>
      <WeatherBody style={{ background: "#0a0a0a" }}>
        <Layout title={"Watch News"}>
          <nav className="nav">
            <div className="main-nav containernews flex">
              <button className="hamburger" onClick={toggleNav}>
                <i className="fas fa-bars"></i>
              </button>
              <div className="nav-links">
                <UL className="flex flexui" style={{ margin: "0 7px" }}>
                  <li
                    className={`hover-link nav-item ${
                      selectedNav === "cricketworldcup" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("cricketworldcup")}
                  >
                    CricketWC
                  </li>
                  <li
                    className={`hover-link nav-item ${
                      selectedNav === "finance" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("finance")}
                  >
                    Finance
                  </li>
                  <li
                    className={`hover-link nav-item ${
                      selectedNav === "politics" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("politics")}
                  >
                    Politics
                  </li>
                </UL>
              </div>
              <div className="search-bar flex">
                <input
                  type="text"
                  className="news-input"
                  placeholder="e.g. Science"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <button className="search-button" onClick={handleSearchClick}>
                  Search
                </button>
              </div>
            </div>
          </nav>
          <main className="main">
            <div className="cards-container containernews flex">
              {articles ? (
                articles.map((article, index) => (
                  <div
                    className="card"
                    key={index}
                    onClick={() => handleCardClick(article.url)}
                  >
                    <div className="card-header">
                      <img
                        src={
                          article.urlToImage ||
                          "https://via.placeholder.com/400x200"
                        }
                        alt="news-image"
                      />
                    </div>
                    <div className="card-content">
                      <h3>{article.title}</h3>
                      <h6 className="news-source">
                        {article.source.name} ·{" "}
                        {new Date(article.publishedAt).toLocaleString("en-US", {
                          timeZone: "Asia/Jakarta",
                        })}
                      </h6>
                      <p className="news-desc">{article.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: " flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "150px",
                    color: "white",
                    fontSize: "2rem",
                  }}
                >
                  NEWS API doesn't support the browser!
                </div>
              )}
            </div>
          </main>
        </Layout>
      </WeatherBody>
    </>
  );
};

export default NewsAPI;
