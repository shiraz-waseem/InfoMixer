import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import "../styles/homepage.css";

const HomePage = () => {
  const HomeBody = styled.body`
    font-family: "Poppins", sans-serif;
    background-color: white;
    min-height: 0;
  `;

  const currentDate = new Date().toLocaleString();
  const navigate = useNavigate();

  return (
    <div style={{ background: "#0a0a0a" }}>
      <nav className="navbar navbar-expand-lg" style={{ background: "none" }}>
        <div className="container-fluid" style={{ display: "block" }}>
          <a className="navbar-brand" href="/" style={{ color: "white" }}>
            InfoMixer
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ float: "right", marginRight: "24px" }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  style={{ color: "white" }}
                  to={"/newsupdate"}
                  className="nav-link active"
                  aria-current="page"
                >
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ color: "white" }}
                  to={"/listenjokes"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Jokes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ color: "white" }}
                  to={"/randomquotes"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Quotes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ color: "white" }}
                  to={"/weatherupdate"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Weather
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  aria-disabled="true"
                  style={{ color: "white" }}
                >
                  Coming Soon
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          justifyContent: "center",
          gap: "8rem",
        }}
      >
        <div class="cardHome" onClick={() => navigate("/newsupdate")}>
          <div class="main-content">
            <div class="header">
              <span>Latest update on</span>
              <span>{currentDate}</span>
            </div>
            <p class="heading">Stay informed with the latest news updates!</p>
            <div class="categories">
              <span>News</span>
            </div>
          </div>
          <div class="footer">by NEWS API</div>
        </div>

        <div class="cardHome" onClick={() => navigate("/listenjokes")}>
          <div class="main-content">
            <div class="header">
              <span>Article on</span>
              <span>29-June-2023</span>
            </div>
            <p class="heading">
              Lighten up your day with a dose of random jokes!
            </p>
            <div class="categories">
              <span>Jokes</span>
              <span>Laughter</span>
            </div>
          </div>
          <div class="footer">by XYZ Writter</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          justifyContent: "center",
          gap: "8rem",
        }}
      >
        <div class="cardHome" onClick={() => navigate("/randomquotes")}>
          <div class="main-content">
            <div class="header">
              <span>Article on</span>
              <span>15-June-2023</span>
            </div>
            <p class="heading">
              Find inspiration with our collection of random quotes.
            </p>
            <div class="categories">
              <span>Quotes</span>
            </div>
          </div>
          <div class="footer">by Anonymous</div>
        </div>
        <div class="cardHome" onClick={() => navigate("/weatherupdate")}>
          <div class="main-content">
            <div class="header">
              <span>Latest update on</span>
              <span>{currentDate}</span>
            </div>
            <p class="heading">
              Stay prepared with up-to-date weather forecasts!
            </p>
            <div class="categories">
              <span>Weather</span>
              <span>Rain</span>
            </div>
          </div>
          <div class="footer">by Weather API</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
