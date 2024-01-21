import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Form from "./pages/AddStory/AddForm";
import EditPage from "./pages/Edit/Edit";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/form" exact Component={Form} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
