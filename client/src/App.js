import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import Routes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
