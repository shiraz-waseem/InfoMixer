import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import "../styles/randomquotes.modules.css";
import {
  faQuoteLeft,
  faQuoteRight,
  faVolumeHigh,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const QuotesBody = styled.body`
  background-color: #d1cccc;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Randomquotes = () => {
  const [quoteData, setQuoteData] = useState("Random Quote is loading...");
  const hasEffectRun = useRef(false); // Use a ref to track if the effect has run
  const [isCopied, setIsCopied] = useState(false); // Track if text is copied

  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speaking is in progress
  const [speech, setSpeech] = useState(new SpeechSynthesisUtterance()); // Create a speech synthesis instance

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes", {
        headers: {
          accept: "application/json",
        },
      });

      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuoteData = data[randomIndex];

      const authorName = randomQuoteData.author.split(",")[0].trim();
      randomQuoteData.author = authorName;

      setQuoteData(randomQuoteData);

      // Update speech text whenever a new quote is fetched
      const newSpeech = new SpeechSynthesisUtterance(randomQuoteData.text);
      newSpeech.lang = "en-US";
      newSpeech.rate = 1.0;
      setSpeech(newSpeech);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!hasEffectRun.current) {
      // Check if the effect has already run
      fetchRandomQuote();
      console.log("Hey");
      hasEffectRun.current = true; // Set the ref to true after running
    }
  }, []);

  // Function to handle copy action
  const handleCopyClick = () => {
    const textToCopy = quoteData.text;

    // Create a text area to copy text to clipboard
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);

    // Select the text and copy it to the clipboard
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Set copied state to true and reset it after a delay
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  const handleSpeech = () => {
    // Start or stop speaking
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    } else {
      window.speechSynthesis.speak(speech);
    }
  };

  const handleTwitterClick = () => {
    // Create a Twitter share URL with the quote
    const tweetText = `"${quoteData.text}" - ${quoteData.author}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;

    // Open Twitter in a new window or tab
    window.open(twitterUrl, "_blank");
  };

  // Cleanup function for speech synthesis
  useEffect(() => {
    return () => {
      // Ensure speech synthesis is canceled when the component unmounts
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <>
      <QuotesBody>
        <Layout title={"Random Quotes"}>
          <div className="wrapper">
            <header>Here's a random quote for you</header>
            <div className="content">
              {quoteData ? (
                <>
                  <div className="quote-area">
                    <i>
                      <FontAwesomeIcon icon={faQuoteLeft} />
                    </i>
                    <p id="quotes" className="quote">
                      {quoteData.text}
                    </p>
                    <i>
                      {" "}
                      <FontAwesomeIcon icon={faQuoteRight} />
                    </i>
                  </div>
                  <div className="author">
                    <span>__</span>
                    <p id="author" className="name">
                      {quoteData.author}
                    </p>
                  </div>
                </>
              ) : (
                "Loading...."
              )}
            </div>

            <div className="buttons">
              <div className="features">
                <ul>
                  <li class="speech" onClick={handleSpeech}>
                    <i>
                      <FontAwesomeIcon
                        icon={faVolumeHigh}
                        style={{ color: "#4185fb" }}
                      />
                    </i>
                  </li>
                  <li class="copy" onClick={handleCopyClick}>
                    <i>
                      <FontAwesomeIcon
                        icon={faCopy}
                        style={{ color: isCopied ? "green" : "#4185fb" }}
                      />
                    </i>
                  </li>
                  <li class="twitter" onClick={handleTwitterClick}>
                    <i>
                      <FontAwesomeIcon
                        icon={faTwitter}
                        style={{ color: "#4185fb" }}
                      />
                    </i>
                  </li>
                </ul>

                <button id="jokebtn" onClick={fetchRandomQuote}>
                  <p id="newQ" style={{ margin: "0 0" }}>
                    Next Quote
                  </p>
                </button>
              </div>
            </div>
          </div>
        </Layout>
      </QuotesBody>
    </>
  );
};

export default Randomquotes;
