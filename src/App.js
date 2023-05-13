import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default connect(null, null)(App);
