import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewsAPI from "./pages/NewsAPI"
import Randomjokes from "./pages/Randomjokes"
import Randomquotes from "./pages/Randomquotes"
import Weathersearch from "./pages/Weathersearch"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/newsupdate" element={<NewsAPI />} />
      <Route path="/listenjokes" element={<Randomjokes />} />
      <Route path="/randomquotes" element={<Randomquotes />} />
      <Route path="/weatherupdate" element={<Weathersearch />} />
    </Routes>
  )
}

export default App